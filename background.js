// Initialize blocking status on installation
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ blockingEnabled: true }); // or false based on default preference
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.storage.local.get('blockingEnabled', (data) => {
        if (data.blockingEnabled && changeInfo.status === "complete" && changeInfo.url) {
            if (tab.url.includes('.ai') || tab.url.includes('chatgpt') || tab.url.includes('gemini') || tab.url.includes('quillbot')) {
                const blockedUrl = encodeURIComponent(tab.url);
                chrome.tabs.update(tabId, { url: chrome.runtime.getURL(`block/blocked.html?url=${blockedUrl}`) });
            }
        }
    });
});

// Listen for new tab creation
chrome.tabs.onCreated.addListener((tab) => {
    chrome.storage.local.get('blockingEnabled', (data) => {
        if (data.blockingEnabled && tab.url && (tab.url.includes('.ai') || tab.url.includes('chatgpt') || tab.url.includes('gemini') || tab.url.includes('quillbot'))) {
            const blockedUrl = encodeURIComponent(tab.url);
            chrome.tabs.update(tab.id, { url: chrome.runtime.getURL(`block/blocked.html?url=${blockedUrl}`) });
        }
    });
});
