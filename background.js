const BLOCK_RULE_ID = 1;

const blockingRule = {
    id: BLOCK_RULE_ID,
    priority: 1,
    action: { type: "redirect", redirect: { url: chrome.runtime.getURL("block/blocked.html") }},
    condition: {
        urlFilter: ".ai|chatgpt|gemini|quillbot",
        resourceTypes: ["main_frame"]
    }
};

// Function to update blocking based on status
function updateBlockingStatus(enabled) {
    // Remove existing rule with BLOCK_RULE_ID to avoid duplication
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [],
        removeRuleIds: [BLOCK_RULE_ID]
    }, () => {
        if (enabled) {
            // Add the blocking rule only if enabled
            chrome.declarativeNetRequest.updateDynamicRules({
                addRules: [blockingRule],
                removeRuleIds: []
            }, () => console.log("Blocking rule added."));
        } else {
            console.log("Blocking rule removed.");
        }
    });
}

// Initial blocking status on load
chrome.storage.local.get("blockingEnabled", (data) => {
    updateBlockingStatus(data.blockingEnabled || false);
});

// Listen for changes to blocking status
chrome.storage.onChanged.addListener((changes) => {
    if (changes.blockingEnabled) {
        updateBlockingStatus(changes.blockingEnabled.newValue);
    }
});
