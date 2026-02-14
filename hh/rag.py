import os
import hashlib
import requests

MODEL_NAME = "llama-3.1-8b-instant"
GROQ_API_KEY = "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"
STATE = {"file_path": None, "extracted_text": ""}

def call_groq(prompt):
    """Call Groq API."""
    import requests
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": MODEL_NAME,
        "messages": [{"role": "user", "content": prompt}]
    }
    
    response = requests.post(url, headers=headers, json=payload, timeout=30)
    return response.json()["choices"][0]["message"]["content"]
   
def process_input(user_input):
        prompt = f"Context: {STATE['extracted_text'][:1000]}\n\nQuestion: {user_input}\nAnswer:" if STATE['extracted_text'] else user_input
        try:
            response = call_groq(prompt)
            return f"\n{response}\n"
        except Exception as e:
            print(f"❌ Error: {e}")
        
