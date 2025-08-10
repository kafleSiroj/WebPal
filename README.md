# **WebPal**  
WebPal is a browser extension designed to make your web browsing easier and more productive.  

---

## **Features**  
1. **Font Size Controller** – Increase or decrease the font size of any webpage you're on.  
2. **AI Text Summarizer** – Uses the `mistral-large` AI model API to summarize selected text on the page.  

---

## **1. Clone the Repository**  

```bash
git clone https://github.com/kafleSiroj/WebPal.git
cd WebPal
```

---

## **2. Load the Extension into Chrome**  
1. Open Chrome and go to:  

```text
chrome://extensions
```

2. Enable **Developer mode** (toggle switch at the top right).  
3. Click **Load unpacked**.  
4. Navigate to and select the **WebPal** folder.  
5. Delete the `__pycache__` folder if it exists before loading.  

---

## **3. Load Your Mistral API Key**  

Get your API key from: [Mistral Console](https://console.mistral.ai/api-keys)  

**Windows PowerShell:**  
```powershell
$env:API_KEY="your_mistral_api"
```

**Windows Command Prompt:**  
```cmd
SET API_KEY=your_mistral_api
```

**Linux/MacOS:**  
```bash
export API_KEY=your_mistral_api
```

---

## **4. Run the Backend Server**  

```bash
pip install -r requirements.txt
uvicorn mistral:app --reload
```

---

## **5. Enjoy the Extension** 🎉  
- Use the popup menu to **control font size** of any webpage.  
- Select text and **summarize it instantly** using Mistral AI.  

---
