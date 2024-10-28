chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        // Check if the URL matches blocked patterns (.ai or keywords)
        if (tab.url.includes('.ai') || tab.url.includes('chatgpt') || tab.url.includes('gemini') || tab.url.includes('quillbot')) {
            const blockedUrl = encodeURIComponent(tab.url); // Define and encode blocked URL
            chrome.tabs.update(tabId, { url: chrome.runtime.getURL(`block/blocked.html?url=${blockedUrl}`) });
        }
    }
});

chrome.tabs.onCreated.addListener((tab) => {
    // Check if the tab's URL matches blocked patterns when a new tab is created
    if (tab.url && (tab.url.includes('.ai') || tab.url.includes('chatgpt') || tab.url.includes('gemini') || tab.url.includes('quillbot'))) {
        const blockedUrl = encodeURIComponent(tab.url); // Define and encode blocked URL
        chrome.tabs.update(tab.id, { url: chrome.runtime.getURL(`block/blocked.html?url=${blockedUrl}`) });
    }
});
