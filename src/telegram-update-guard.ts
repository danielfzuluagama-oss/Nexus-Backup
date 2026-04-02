import { getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

type UpdateStatus = "processing" | "completed" | "failed";
type UpdateState = {
  botName: string;
  updateId: number;
  status: UpdateStatus;
  attempts: number;
  claimedAt: number;
  updatedAt: number;
  leaseUntil: number;
  completedAt?: number;
  lastError?: string | null;
};

export type TelegramUpdateClaimResult = "claimed" | "duplicate";

const COLLECTION_NAME = "telegram_update_guard";
const LEASE_MS = 10 * 60 * 1000;
const localStates = new Map<string, UpdateState>();

function toKey(botName: string, updateId: number): string {
  return `${botName}:${updateId}`;
}

function isTrackedUpdate(updateId: number): boolean {
  return Number.isInteger(updateId) && updateId > 0;
}

function now(): number {
  return Date.now();
}

function hasFirestore(): boolean {
  return getApps().length > 0;
}

function createProcessingState(botName: string, updateId: number, attempts: number, timestamp: number): UpdateState {
  return {
    botName,
    updateId,
    status: "processing",
    attempts,
    claimedAt: timestamp,
    updatedAt: timestamp,
    leaseUntil: timestamp + LEASE_MS,
    lastError: null,
  };
}

export async function claimTelegramUpdate(
  botName: string,
  updateId: number,
): Promise<TelegramUpdateClaimResult> {
  if (!isTrackedUpdate(updateId)) {
    return "claimed";
  }

  const key = toKey(botName, updateId);
  const timestamp = now();

  if (!hasFirestore()) {
    const current = localStates.get(key);
    if (current?.status === "completed") {
      return "duplicate";
    }
    if (current?.status === "processing" && current.leaseUntil > timestamp) {
      return "duplicate";
    }

    localStates.set(
      key,
      createProcessingState(botName, updateId, (current?.attempts ?? 0) + 1, timestamp),
    );
    return "claimed";
  }

  const db = getFirestore();
  const ref = db.collection(COLLECTION_NAME).doc(key);

  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const current = snapshot.exists ? (snapshot.data() as UpdateState) : null;

    if (current?.status === "completed") {
      return "duplicate";
    }
    if (current?.status === "processing" && current.leaseUntil > timestamp) {
      return "duplicate";
    }

    transaction.set(
      ref,
      createProcessingState(botName, updateId, (current?.attempts ?? 0) + 1, timestamp),
      { merge: true },
    );
    return "claimed";
  });
}

export async function markTelegramUpdateCompleted(botName: string, updateId: number): Promise<void> {
  if (!isTrackedUpdate(updateId)) {
    return;
  }

  const key = toKey(botName, updateId);
  const timestamp = now();

  if (!hasFirestore()) {
    const current = localStates.get(key);
    localStates.set(key, {
      botName,
      updateId,
      status: "completed",
      attempts: current?.attempts ?? 1,
      claimedAt: current?.claimedAt ?? timestamp,
      updatedAt: timestamp,
      leaseUntil: 0,
      completedAt: timestamp,
      lastError: null,
    });
    return;
  }

  await getFirestore().collection(COLLECTION_NAME).doc(key).set(
    {
      botName,
      updateId,
      status: "completed",
      updatedAt: timestamp,
      leaseUntil: 0,
      completedAt: timestamp,
      lastError: null,
    },
    { merge: true },
  );
}

export async function markTelegramUpdateFailed(
  botName: string,
  updateId: number,
  error: unknown,
): Promise<void> {
  if (!isTrackedUpdate(updateId)) {
    return;
  }

  const key = toKey(botName, updateId);
  const timestamp = now();
  const lastError = error instanceof Error ? error.message : String(error);

  if (!hasFirestore()) {
    const current = localStates.get(key);
    localStates.set(key, {
      botName,
      updateId,
      status: "failed",
      attempts: current?.attempts ?? 1,
      claimedAt: current?.claimedAt ?? timestamp,
      updatedAt: timestamp,
      leaseUntil: 0,
      completedAt: current?.completedAt,
      lastError,
    });
    return;
  }

  await getFirestore().collection(COLLECTION_NAME).doc(key).set(
    {
      botName,
      updateId,
      status: "failed",
      updatedAt: timestamp,
      leaseUntil: 0,
      lastError,
    },
    { merge: true },
  );
}

export function resetTelegramUpdateGuardForTests(): void {
  localStates.clear();
}
