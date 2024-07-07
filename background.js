chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.summary) {
      chrome.storage.local.set({ summary: request.summary });
    }
    if (request.numericData) {
      chrome.storage.local.set({ numericData: request.numericData });
    }
  });
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updatePopup') {
      chrome.action.setPopup({ popup: 'popup.html' });
      chrome.action.openPopup();
    }
  });
  
  