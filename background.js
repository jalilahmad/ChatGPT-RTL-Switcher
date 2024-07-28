chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get(['rtlState'], (result) => {
    const currentState = result.rtlState;
    const newState = !currentState;

    chrome.storage.local.set({ rtlState: newState }, () => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: applyDirection,
        args: [newState]
      });
    });
  });
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
