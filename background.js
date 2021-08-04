chrome.contextMenus.create ({
    "title": "Pomodoro Productivity",
    id: "test",
    "contexts": ["selection"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if(info.menuItemId = "test") {
        return function(info, tab) {
            let text = info.selectionText;
            let indexfile = /popup/popup.html; 
            chrome.tabs.create ({index: tab.index + 1, url: indexfile, selected: true});
        }  
    }
});