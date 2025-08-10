const slider = document.getElementById('textsize');
const numberInput = document.getElementById('textsizeInput');

function updateInputs(size) {
  size = Number(size);
  if (isNaN(size)) return;
  if (size < 10) size = 10;
  if (size > 50) size = 50;
  slider.value = size;
  numberInput.value = size;
}

function sendsize(size) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;
    const tabId = tabs[0].id;

    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ['static/js/content.js']
      },
      () => {
        if (chrome.runtime.lastError) {
          console.warn('Injection failed:', chrome.runtime.lastError.message);
          return;
        }

        chrome.tabs.sendMessage(tabId, {
          action: 'changeAllTextSize',
          size: size
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn('Message sending failed:', chrome.runtime.lastError.message);
          }
        });
      }
    );
  });
}

function savesize(size) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;
    const url = tabs[0].url;
    chrome.storage.local.set({ ['textSize_' + url]: size });
  });
}

function loadsize() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;
    const url = tabs[0].url;
    chrome.storage.local.get(['textSize_' + url], (result) => {
      const savedSize = result['textSize_' + url];
      if (savedSize) {
        updateInputs(savedSize);
      } else {
        updateInputs(30);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', loadsize);

slider.addEventListener('input', () => {
  const size = slider.value;
  updateInputs(size);
  sendsize(size);
  savesize(size);
});

numberInput.addEventListener('change', () => {
  const size = numberInput.value;
  updateInputs(size);
  sendsize(size);
  savesize(size);
});
