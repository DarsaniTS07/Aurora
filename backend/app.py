from flask import Flask, request, jsonify
import os
import google.generativeai as aura
import PyPDF2

# ===== Flask App =====
app = Flask(__name__)

# ===== PDF DATASET FOLDER =====
DATASET_FOLDER = r"C:\Users\Mahithaa sri\OneDrive\Desktop\SIH\Aurora\backend\dataset"

# ===== API CONFIG =====
try:
    API_KEY = 'AIzaSyApePtMbMz-tZ6NDO_9qzqbzQ2h5lSefu8'
    aura.configure(api_key=API_KEY)
except Exception as e:
    print("API configuration error:", e)
    exit(1)

# ===== MODEL CONFIG =====
generation_config = {
    "temperature": 0.9,
    "top_p": 0.9,
    "max_output_tokens": 4096,
    "response_mime_type": "text/plain",
}

model = aura.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction = """
You are Aurora, an assistant focused on water quality, health, and rural village data.

You can do:
- Answer user questions about water-related concepts (pH, contamination, safe water practices, waterborne diseases, their effects, prevention methods) in a clear, simple, and user-friendly way.
- Answer questions about specific villages or regions strictly using the provided PDF dataset.
- Provide prevention and health tips when asked.

Example:
user: what is the ph
ai: pH tells us if water is acidic or alkaline. Pure water has a pH of 7 (neutral). A low pH (acidic) can corrode pipes and harm health, while a high pH (alkaline) can make water taste bitter.

You can’t do:
- Answer irrelevant questions that are not related to water, health, or the dataset (like programming, math, finance, etc.).  
For such queries, always reply: "sorry This is irrelevant to me."

Example:
user: give a code for adding two numbers
ai: This is irrelevant to me.

Rules:
1. For dataset-based queries, use only the dataset (do not invent).  
2. For water-related and educational queries, reply in a simple, supportive way.  
3. If irrelevant, politely decline with: "This is irrelevant to me."
4. Use emojis wherever possible."
"""
)      

# ===== PDF LOADER =====
def load_pdfs(folder_path):
    text_data = ""
    for file in os.listdir(folder_path):
        if file.endswith(".pdf"):
            with open(os.path.join(folder_path, file), "rb") as f:
                reader = PyPDF2.PdfReader(f)
                for page in reader.pages:
                    text_data += page.extract_text() + "\n"
    return text_data

pdf_knowledge = load_pdfs(DATASET_FOLDER)

# ===== GENERIC WATERBORNE PREVENTION =====
def prevention_tips():
    return (
        "Here are generic prevention tips for waterborne diseases:\n"
        "- Drink only safe, filtered, or boiled water.\n"
        "- Wash hands regularly with soap and clean water.\n"
        "- Avoid raw or undercooked food.\n"
        "- Keep water storage containers clean and covered.\n"
        "- Maintain hygiene and sanitation in your surroundings."
    )

# ===== API ROUTE =====
@app.route("/ask", methods=["GET", "POST"])
def ask_aura():
    try:
        # ✅ Handle GET and POST
        if request.method == "GET":
            command = request.args.get("query", "").strip().lower()
        else:
            data = request.get_json()
            if not data or "query" not in data:
                return jsonify({"error": "Please provide a 'query' field"}), 400
            command = data["query"].strip().lower()

        if not command:
            return jsonify({"error": "Empty query provided"}), 400

        # ✅ Generic health/prevention questions
        if any(x in command for x in ["waterborne", "disease", "prevention", "health tip"]):
            answer = prevention_tips()
        else:
            # ✅ Dataset queries
            response = model.generate_content(
                f"User asked: {command}\n\n"
                f"Refer strictly to the PDF dataset:\n{pdf_knowledge[:3000]}"
            )

            # Some models return `.text`, others return `.candidates[...]`
            try:
                answer = response.text
            except AttributeError:
                answer = response.candidates[0].content.parts[0].text

        return jsonify({"answer": answer})

    except Exception as e:
        import traceback
        print("🔥 ERROR inside /ask:", e)
        traceback.print_exc()
        return jsonify({"answer": "Sorry, I couldn't process your request."}), 500

# ===== RUN SERVER =====
if __name__ == "__main__":
    app.run(debug=True)
