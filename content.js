// Content filtering function

// Define your content filtering function
function applyContentFilter(blockOffensive, blockSexual) {
    function applyContentFilter(blockOffensive, blockSexual) {
        // Define keywords for offensive and sexual content
        const offensiveKeywords = ["fuck", "hate", "gay", "fucker", "nigga", "chuti", "bsdk", "ass", "pussy"];
        const sexualKeywords = ["porn", "sex", "child", "gay", "xnxx", "xvideos", "sleeping", "nude"];

        // Helper function to check if text contains any offensive or sexual keywords
        function containsKeywords(text, keywords) {
            for (const keyword of keywords) {
                if (text.toLowerCase().includes(keyword.toLowerCase())) {
                    return true;
                }
            }
            return false;
        }

        // Find and process all text nodes on the page
        const textNodes = document.querySelectorAll('*:not(script):not(style)');
        for (const node of textNodes) {
            if (blockOffensive && containsKeywords(node.textContent, offensiveKeywords)) {
                // Block or hide offensive content (you can customize this action)
                node.style.display = 'none'; // Hide the element
            }

            if (blockSexual && containsKeywords(node.textContent, sexualKeywords)) {
                // Block or hide sexual content (you can customize this action)
                node.style.display = 'none'; // Hide the element
            }
        }
    }

// Listen for messages from the popup (popup.js)
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === 'applyFilter') {
            const blockOffensive = message.blockOffensive;
            const blockSexual = message.blockSexual;

            // Call the content filtering function with user's selections
            applyContentFilter(blockOffensive, blockSexual);
            sendResponse({ success: true });
        }
    });

}

// Create a MutationObserver instance to watch for DOM changes
const observer = new MutationObserver(function (mutationsList, observer) {
    // Check for changes in added nodes
    for (const mutation of mutationsList) {
        for (const addedNode of mutation.addedNodes) {
            if (addedNode.nodeType === Node.ELEMENT_NODE) {
                // Check if the added node is an element
                applyContentFilter(blockOffensive, blockSexual);
            }
        }
    }
});
// Set an interval to periodically apply content filtering
const filteringInterval = setInterval(function () {
    applyContentFilter(blockOffensive, blockSexual);
}, 5000); // Adjust the interval as needed (e.g., every 5 seconds)
// Start observing changes in the entire document

observer.observe(document, { childList: true, subtree: true });
