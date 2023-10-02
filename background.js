// This is an example background script for your Chrome extension

// Listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(function () {
    // Perform any initialization tasks here if needed
    console.log('Extension installed or updated');
});

// Listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Handle messages here
    if (message.action === 'someAction') {
        // Do something in response to the message
        console.log('Received a message:', message);
    }

    // Send a response if necessary
    sendResponse({ success: true });
});

// You can add more event listeners and functionality as needed
