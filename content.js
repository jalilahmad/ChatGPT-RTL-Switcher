chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleDirection") {
    // انتخاب تمام عناصر با ویژگی dir در کلاس‌های مورد نظر
    const dirElements = document.querySelectorAll('.w-full.text-token-text-primary [dir]');

    // تغییر ویژگی dir بین auto و rtl مگر برای عناصری که کلاس overflow-y-auto دارند
    toggleDirAttribute(dirElements);
  }

  function toggleDirAttribute(elements) {
    elements.forEach((element) => {
      // تغییر ویژگی dir مگر اینکه عنصر دارای کلاس overflow-y-auto باشد
      if (!element.classList.contains('overflow-y-auto')) {
        const currentDir = element.getAttribute('dir');
        // تغییر به rtl اگر auto است و بالعکس
        const newDir = currentDir === 'auto' ? 'rtl' : 'auto';
        element.setAttribute('dir', newDir);
      }
    });
  }
});
