chrome.contextMenus.create ({
    "title": "Pomodoro Productivity",
    "contexts": ["selection"],
    "onclick": openTab()
});

function openTab(){
    return function(info, tab){
      let text = info.selectionText;
      let indexfile = index.html; 
      chrome.tabs.create ({index: tab.index + 1, url: indexfile, selected: true});
    }
};

