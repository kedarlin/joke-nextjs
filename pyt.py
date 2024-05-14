import os
import openai
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)
openai_api_key = os.getenv("OPEN_API_KEY")
openai.api_key = openai_api_key

@app.route('/generate_joke', methods=['POST'])
def generate_joke():
    try:
        prompt = prompt = request.form.get("prompt", "")
        print(prompt)
        
        prompt += "\n\nGenerate a joke about a funny joke about a "+prompt
        
        completion = openai.Completion.create(
            engine="davinci-002",
            prompt=prompt,
            max_tokens=50,
            temperature=0.7,
            n=1
        )
        
        joke = completion.choices[0].text.strip()
        print(joke)
        return jsonify({"joke": joke})
    except Exception as e:
        app.logger.error("An error occurred: %s", str(e))
        
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)