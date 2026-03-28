export function estimateTokens(text) {
    return Math.ceil(text.length / 4);
}
export function calculateBudget(config, systemPrompt) {
    const total = config.modelContextWindow;
    const reserved = config.maxTokens;
    const system = estimateTokens(systemPrompt);
    const safety = Math.ceil(total * 0.1);
    const available = Math.max(0, total - reserved - system - safety);
    return { total, reserved, system, safety, available };
}
export function trimHistory(messages, budgetTokens) {
    if (messages.length === 0)
        return messages;
    let totalTokens = 0;
    for (const msg of messages) {
        totalTokens += estimateTokens(msg.content ?? "");
    }
    if (totalTokens <= budgetTokens)
        return messages;
    const trimmed = [...messages];
    while (trimmed.length > 1 && totalTokens > budgetTokens) {
        const dropped = trimmed.shift();
        totalTokens -= estimateTokens(dropped.content ?? "");
    }
    return trimmed;
}
