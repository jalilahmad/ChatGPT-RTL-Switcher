chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applyDirection") {
    chrome.storage.local.get(['rtlState'], (result) => {
      const isRTL = result.rtlState;
      applyDirection(isRTL);
    });
  }

  function applyDirection(isRTL) {
    const dir = isRTL ? 'rtl' : 'auto';
    const elements = document.querySelectorAll('.w-full.text-token-text-primary [dir]');
    elements.forEach((element) => {
      if (!element.classList.contains('overflow-y-auto')) {
        element.setAttribute('dir', dir);
      }
    });
  }
});

// چک کردن و به‌روزرسانی جهت‌دهی (dir) برای عناصر جدید به طور منظم
setInterval(() => {
  chrome.storage.local.get(['rtlState'], (result) => {
    const isRTL = result.rtlState;
    const dir = isRTL ? 'rtl' : 'auto';
    const elements = document.querySelectorAll('.w-full.text-token-text-primary [dir]');
    elements.forEach((element) => {
      if (!element.classList.contains('overflow-y-auto')) {
        element.setAttribute('dir', dir);
      }
    });
  });
}, 1000); // هر 1 ثانیه چک کردن
