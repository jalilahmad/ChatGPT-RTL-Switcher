chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: toggleDirection,
    },
    () => {}
  );
});

function toggleDirection() {
  // انتخاب تمام عناصر با ویژگی dir در کلاس‌های مورد نظر
  const dirElements = document.querySelectorAll('.h-full [dir]');

  // تغییر ویژگی dir بین auto و rtl مگر برای عناصری که کلاس overflow-y-auto دارند
  toggleDirAttribute(dirElements);

  function toggleDirAttribute(elements) {
    elements.forEach(element => {
      // اگر عنصر دارای کلاس overflow-y-auto نباشد، ویژگی dir آن را تغییر دهید
      if (!element.classList.contains('overflow-y-auto')) {
        // تعیین مقدار جدید dir: اگر dir فعلی auto باشد، به rtl تغییر دهید و برعکس
        const currentDir = element.getAttribute('dir');
        const newDir = currentDir === 'auto' ? 'rtl' : 'auto';
        element.setAttribute('dir', newDir);
      }
    });
  }
}
