chrome.contextMenus.create ({
    "title": "Pomodoro Productivity",
    id: "test",
    "contexts": ["selection"],
    /*"onclick": openTab()*/
});

//function openTab(){
//    return function(info, tab){
//      let text = info.selectionText;
//      let indexfile = index.html; 
//      chrome.tabs.create ({index: tab.index + 1, url: indexfile, selected: true});
//    }
//};

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if(info.menuItemId = "test") {
        return function(info, tab) {
            let text = info.selectionText;
            let indexfile = index.html; 
            chrome.tabs.create ({index: tab.index + 1, url: indexfile, selected: true});
        }  
    }
});