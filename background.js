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

// Ensure a clean state on startup by removing any existing rule with BLOCK_RULE_ID
chrome.runtime.onStartup.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [],
        removeRuleIds: [BLOCK_RULE_ID]
    }, () => {
        console.log("Cleared existing rules on startup.");
    });
});

// Function to enable blocking by adding the rule
function enableBlocking() {
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [blockingRule],
        removeRuleIds: [BLOCK_RULE_ID] // Remove any existing rule with the same ID
    }, () => {
        console.log("Blocking rule added.");
    });
}

// Function to disable blocking by removing the rule
function disableBlocking() {
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [],
        removeRuleIds: [BLOCK_RULE_ID]
    }, () => {
        console.log("Blocking rule removed.");
    });
}

// Set initial blocking status when extension loads
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ blockingEnabled: false }); // Default to disabled
});

chrome.storage.local.get("blockingEnabled", (data) => {
    if (data.blockingEnabled) {
        enableBlocking();
    } else {
        disableBlocking();
    }
});

// Listen for changes to blockingEnabled status
chrome.storage.onChanged.addListener((changes) => {
    if (changes.blockingEnabled) {
        if (changes.blockingEnabled.newValue) {
            enableBlocking();
        } else {
            disableBlocking();
        }
    }
});

