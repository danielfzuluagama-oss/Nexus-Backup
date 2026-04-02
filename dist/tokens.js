export function estimateTokens(text) {
    return Math.ceil(text.length / 4);
}
export function estimateMessagesTokens(messages) {
    return messages.reduce((total, message) => total + estimateTokens(message.content ?? ""), 0);
}
export function estimateToolDefinitionsTokens(tools) {
    if (tools.length === 0)
        return 0;
    return estimateTokens(JSON.stringify(tools));
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
export function fitMessagesToRequestBudget(messages, tools, options) {
    const minResponseTokens = options.minResponseTokens ?? 256;
    const safetyTokens = options.safetyTokens ?? 128;
    const toolTokens = estimateToolDefinitionsTokens(tools);
    const firstNonSystemIndex = messages.findIndex((message) => message.role !== "system");
    const leadingSystemCount = firstNonSystemIndex === -1 ? messages.length : firstNonSystemIndex;
    const systemPrefix = messages.slice(0, leadingSystemCount);
    const history = messages.slice(leadingSystemCount);
    const systemTokens = estimateMessagesTokens(systemPrefix);
    const historyBudget = Math.max(0, options.requestTokenLimit - minResponseTokens - safetyTokens - toolTokens - systemTokens);
    const trimmedHistory = trimHistory(history, historyBudget);
    const inputTokens = systemTokens + estimateMessagesTokens(trimmedHistory) + toolTokens;
    const availableResponseTokens = Math.max(0, options.requestTokenLimit - inputTokens - safetyTokens);
    const responseTokens = Math.max(0, Math.min(options.desiredResponseTokens, availableResponseTokens));
    return {
        messages: [...systemPrefix, ...trimmedHistory],
        inputTokens,
        toolTokens,
        responseTokens,
        availableResponseTokens,
        trimmed: trimmedHistory.length !== history.length,
        fits: availableResponseTokens >= minResponseTokens,
    };
}
