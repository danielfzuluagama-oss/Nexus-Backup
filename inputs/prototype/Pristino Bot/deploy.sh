#!/bin/bash
set -e

# ==============================================================================
# Pristino 10x - Cloud Run & Pub/Sub Deployment Script
# ==============================================================================

PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
  echo "Error: No GCP Project configured. Run 'gcloud auth login' and 'gcloud config set project YOUR_PROJECT_ID'."
  exit 1
fi

REGION="us-central1"
SERVICE_NAME="pristino-bot"
TOPIC_NAME="pristino-messages"
SUBSCRIPTION_NAME="pristino-worker-sub"

echo "Deploying Pristino to Google Cloud Platform ($PROJECT_ID)..."

# 1. Create Pub/Sub Topic (if it doesn't exist)
echo "Ensuring Pub/Sub topic '$TOPIC_NAME' exists..."
gcloud pubsub topics describe $TOPIC_NAME || gcloud pubsub topics create $TOPIC_NAME

# 2. Deploy to Cloud Run (Serverless Webhook endpoints)
echo "Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars="PUBSUB_TOPIC=$TOPIC_NAME" \
  --quiet

# Fetch the assigned Cloud Run URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format='value(status.url)')
echo "Cloud Run Service URL: $SERVICE_URL"

# 3. Create or Update Pub/Sub Push Subscription pointing to the Cloud Run endpoint
echo "Configuring Pub/Sub Push Subscription to target $SERVICE_URL/pubsub-push..."
PUSH_ENDPOINT="$SERVICE_URL/pubsub-push"

if gcloud pubsub subscriptions describe $SUBSCRIPTION_NAME >/dev/null 2>&1; then
  gcloud pubsub subscriptions update $SUBSCRIPTION_NAME \
    --push-endpoint=$PUSH_ENDPOINT
else
  gcloud pubsub subscriptions create $SUBSCRIPTION_NAME \
    --topic=$TOPIC_NAME \
    --push-endpoint=$PUSH_ENDPOINT \
    --ack-deadline=120
fi

# 4. Tell Cloud Run its own Webhook URL (for Telegram Auto-Registration in Express Server)
echo "Updating Cloud Run with its WEBHOOK_URL..."
gcloud run services update $SERVICE_NAME \
  --region $REGION \
  --update-env-vars="WEBHOOK_URL=$SERVICE_URL" \
  --quiet

echo "✅ Pristino 10x successfully deployed to Cloud Run with Pub/Sub!"
echo "⚠️  Ensure you inject Telegram/Groq API keys in the Secret Manager or Environment Variables of the Cloud Run service via the GCP Console."
