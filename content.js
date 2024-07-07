// content.js
function getTextContent() {
  return document.body.innerText;
}

// Example: Listen for messages to trigger content extraction
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getTextContent") {
    const content = getTextContent();
    sendResponse({ content });
  }
});