chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applyDirection") {
    applyDirection(request.rtlState);
  }
});

function applyDirection(isRTL) {
  const dir = isRTL ? 'rtl' : 'auto';
  const elements = document.querySelectorAll('.w-full.text-token-text-primary [dir]');
  
  elements.forEach((element) => {
    if (!element.classList.contains('overflow-y-auto')) {
      element.setAttribute('dir', dir);
    }
  });
}

// نظارت بر تغییرات DOM
new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1) { // Ensure the node is an element
        if (node.matches('.w-full.text-token-text-primary [dir]') && !node.classList.contains('overflow-y-auto')) {
          chrome.storage.local.get(['rtlState'], (result) => {
            const isRTL = result.rtlState;
            const dir = isRTL ? 'rtl' : 'auto';
            node.setAttribute('dir', dir);
          });
        }
      }
    });
  });
}).observe(document.body, { childList: true, subtree: true });
