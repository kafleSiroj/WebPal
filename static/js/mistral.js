const textbox = document.getElementById("text");
const sl2sm = document.getElementById("selectedText");
let in_txt = ""; 

async function Summarize(text_in) {
  const response = await fetch("http://127.0.0.1:8000/output", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: text_in }),
  });
  const data = await response.json();
  return data.message;
}

document.addEventListener("DOMContentLoaded", () => {
  if (!textbox) {
    console.error("Element id 'selectedText' not found.");
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "SELECTION_CHANGED") {
      in_txt = message.text.trim();
      if (!in_txt) {
        in_txt = "Please select text to summarize";
      }
      if (textbox) {
        textbox.innerText = in_txt;
      }
    }
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      if (textbox) {
        textbox.innerText = "No active tab";
      }
      in_txt = "";
      return;
    }

    const tabId = tabs[0].id;

    chrome.scripting.executeScript(
      {
        target: { tabId },
        files: ["static/js/content.js"]
      },
      () => {
        if (chrome.runtime.lastError) {
          if (textbox) {
            textbox.innerText = "Cannot access page content";
          }
          in_txt = "";
          return;
        }

        chrome.tabs.sendMessage(tabId, { type: "GET_SELECTED_TEXT" }, (response) => {
          if (chrome.runtime.lastError) {
            if (textbox) {
              textbox.innerText = "Cannot access page content";
            }
            in_txt = "";
            return;
          }

          if (response && response.text) {
            in_txt = response.text.trim();
            if (!in_txt) {
              in_txt = "Please select text to summarize";
            }
            if (textbox) {
              textbox.innerText = in_txt;
            }
          } else {
            in_txt = "Please select text to summarize";
            if (textbox) {
              textbox.innerText = in_txt;
            }
          }
          console.log("Selected text:", in_txt);
        });
      }
    );
  });

  const btn1 = document.getElementById("summarize");
  if (btn1) {
    btn1.addEventListener("click", async () => {
      textbox.textContent = await Summarize(in_txt);
      sl2sm.textContent = "Summarized Text"
    });
  }
});
