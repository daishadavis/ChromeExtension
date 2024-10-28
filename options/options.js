const save = document.getElementById('saveButton')

save.addEventListener('click', function() {
    const blockList = document.getElementById('block').ariaValueMax.split('\n').map(site => site.trim()).filter(site => site);

    // Saved the list to Chrome Storage
    chrome.storage.sync.set({blockList: blockList}, function() {
        alert('Block List saved!')
    })
})

// Load saved block list on page load
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('blockList', function(data) {
        if (data.blockList) {
            document.getElementById('blockList').value = data.blockList.join('\n');
        }
    });
});