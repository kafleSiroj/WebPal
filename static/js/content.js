function sendSelection() {
  const text = window.getSelection().toString();
  chrome.runtime.sendMessage({ type: "SELECTION_CHANGED", text });
}

document.addEventListener("selectionchange", () => {
  sendSelection();
});

function injectFontSizeStyle(size) {
  const styleId = 'custom-fontsize-style';
  let styleTag = document.getElementById(styleId);

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  styleTag.textContent = `* { font-size: ${size}px !important; }`;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'changeAllTextSize') {
    injectFontSizeStyle(request.size);
    sendResponse({ status: 'done' });
  } else if (request.type === "GET_SELECTED_TEXT") {
    const selectedText = window.getSelection().toString();
    sendResponse({ text: selectedText });
  }
});
