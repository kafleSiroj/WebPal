import requests
import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

API_KEY = os.getenv("API_KEY") 
API_URL = "https://api.mistral.ai/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

class Data(BaseModel):
    prompt: str



app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

@app.post("/output")
async def output(text: Data):
    data = {
        "model": "mistral-large-latest", 
        "messages": [
            {"role": "system", "content": "Summarize the information from the following messages in bullet points, keeping the summary about one-third the length of the original. If the text lacks detail, respond: 'This text does not have much detail to summarize.' If programming code is given, explain what it does in bullet points. If the input is a question, answer it. If the answer is long or lists multiple points, give it in bullet form. If the answer is short (e.g., a definition, law, or single fact), give it directly without bullets."},
            {"role": "user", "content": f"{text.prompt}"}
        ],
        "temperature": 0.7,
        "max_tokens": 2000
    }

    response = requests.post(API_URL, headers=headers, json=data)

    if response.status_code == 200:
        result = response.json()
        msg = result['choices'][0]['message']['content']
        return {"message": msg}
    else:
        return {"message":f"Error {response.status_code}: {response.text}"}
