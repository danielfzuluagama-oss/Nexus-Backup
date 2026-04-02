import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod/v4";
const rootSkillSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
}).passthrough();
function isRecord(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isStringArray(value) {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}
function collectIssuesForWorkflow(workflow, workflowPath, issues, allowImplicitId = false) {
    if (!isRecord(workflow)) {
        issues.push(`${workflowPath}: workflow entry must be an object`);
        return;
    }
    const hasIdentity = typeof workflow.id === "string"
        || typeof workflow.name === "string"
        || typeof workflow.title === "string";
    if (!allowImplicitId && !hasIdentity) {
        issues.push(`${workflowPath}: workflow must define id, name, or title`);
    }
    if ("steps" in workflow) {
        const { steps } = workflow;
        const stepsValid = Array.isArray(steps)
            && steps.every((step) => typeof step === "string" || isRecord(step));
        if (!stepsValid) {
            issues.push(`${workflowPath}.steps: expected an array of strings or step objects`);
        }
    }
    if ("phases" in workflow) {
        const { phases } = workflow;
        const phasesValid = Array.isArray(phases)
            || isStringArray(phases)
            || isRecord(phases);
        if (!phasesValid) {
            issues.push(`${workflowPath}.phases: expected an array or object`);
        }
    }
    if ("raci" in workflow && !isRecord(workflow.raci)) {
        issues.push(`${workflowPath}.raci: expected an object`);
    }
    if ("inputs" in workflow) {
        const inputsValid = Array.isArray(workflow.inputs)
            || isRecord(workflow.inputs)
            || typeof workflow.inputs === "string";
        if (!inputsValid) {
            issues.push(`${workflowPath}.inputs: expected a string, array, or object`);
        }
    }
}
function validateSkillFile(filePath) {
    const content = readFileSync(filePath, "utf8");
    let parsed;
    try {
        parsed = parseYaml(content);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
            file: filePath,
            issues: [`YAML parse failed: ${message}`],
        };
    }
    if (!isRecord(parsed)) {
        return {
            file: filePath,
            issues: ["root: skill definition must be a YAML object"],
        };
    }
    const rootValidation = rootSkillSchema.safeParse(parsed);
    if (!rootValidation.success) {
        return {
            file: filePath,
            issues: rootValidation.error.issues.map((issue) => {
                const location = issue.path.length > 0 ? issue.path.join(".") : "root";
                return `${location}: ${issue.message}`;
            }),
        };
    }
    const issues = [];
    const skill = rootValidation.data;
    if (typeof skill.purpose !== "string" && typeof skill.description !== "string") {
        issues.push("root: skill must define purpose or description");
    }
    if (typeof skill.owningAgent !== "string" && typeof skill.owner !== "string") {
        issues.push("root: skill must define owningAgent or owner");
    }
    if (skill.triggerTypes === undefined
        && skill.triggers === undefined
        && skill.trigger === undefined) {
        issues.push("root: skill should define triggerTypes, triggers, or trigger");
    }
    if ("memoryReadsWrites" in skill) {
        const memoryReadsWrites = skill.memoryReadsWrites;
        if (!isRecord(memoryReadsWrites)) {
            issues.push("memoryReadsWrites: expected an object");
        }
        else {
            if ("reads" in memoryReadsWrites && !isStringArray(memoryReadsWrites.reads)) {
                issues.push("memoryReadsWrites.reads: expected a string array");
            }
            if ("writes" in memoryReadsWrites && !isStringArray(memoryReadsWrites.writes)) {
                issues.push("memoryReadsWrites.writes: expected a string array");
            }
        }
    }
    if ("interoperabilityContract" in skill && !isRecord(skill.interoperabilityContract)) {
        issues.push("interoperabilityContract: expected an object");
    }
    if ("workflows" in skill) {
        const { workflows } = skill;
        if (Array.isArray(workflows)) {
            workflows.forEach((workflow, index) => {
                collectIssuesForWorkflow(workflow, `workflows.${index}`, issues);
            });
        }
        else if (isRecord(workflows)) {
            for (const [workflowId, workflow] of Object.entries(workflows)) {
                collectIssuesForWorkflow(workflow, `workflows.${workflowId}`, issues, true);
            }
        }
        else {
            issues.push("workflows: expected an array or object");
        }
    }
    return issues.length > 0
        ? {
            file: filePath,
            issues,
        }
        : null;
}
function walkSkillFiles(agentsPath) {
    if (!existsSync(agentsPath)) {
        return [];
    }
    const agentDirs = readdirSync(agentsPath, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
        .map((entry) => entry.name)
        .sort((left, right) => left.localeCompare(right));
    const skillFiles = [];
    for (const agentId of agentDirs) {
        const skillsRoot = path.join(agentsPath, agentId, "skills");
        if (!existsSync(skillsRoot)) {
            continue;
        }
        const skillDirs = readdirSync(skillsRoot, { withFileTypes: true })
            .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
            .map((entry) => entry.name)
            .sort((left, right) => left.localeCompare(right));
        for (const skillId of skillDirs) {
            const skillPath = path.join(skillsRoot, skillId, "skill.yaml");
            if (existsSync(skillPath)) {
                skillFiles.push(skillPath);
            }
        }
    }
    return skillFiles;
}
function main() {
    const agentsPath = path.resolve(process.cwd(), process.env.AGENTS_PATH ?? "agents");
    const skillFiles = walkSkillFiles(agentsPath);
    if (skillFiles.length === 0) {
        console.log(`No skill.yaml files found under ${agentsPath}`);
        return;
    }
    const failures = skillFiles
        .map(validateSkillFile)
        .filter((failure) => failure !== null);
    if (failures.length > 0) {
        console.error(`Skill validation failed for ${failures.length} file(s):`);
        for (const failure of failures) {
            console.error(`- ${failure.file}`);
            for (const issue of failure.issues) {
                console.error(`  * ${issue}`);
            }
        }
        process.exitCode = 1;
        return;
    }
    console.log(`Validated ${skillFiles.length} skill definition file(s) successfully.`);
}
main();
