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
    system_instruction="""
        You are Aura.
        1. For queries about specific villages or data in the PDF dataset, answer strictly based on the dataset.
        2. For questions about prevention or health tips (e.g., waterborne diseases), provide generic advice, not from the dataset.
        3. For anything else, respond: 'I am not trained for that.'
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
@app.route("/ask", methods=["POST"])
def ask_aura():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({"error": "Please provide a 'query' field"}), 400

    command = data["query"].strip().lower()

    try:
        # Generic health/prevention questions
        if "waterborne" in command or "disease" in command or "prevention" in command or "health tip" in command:
            answer = prevention_tips()
        else:
            # Dataset queries
            response = model.generate_content(
                f"User asked: {command}\n\n"
                f"Refer strictly to the PDF dataset:\n{pdf_knowledge[:3000]}"
            )
            answer = response.text
        return jsonify({"answer": answer})
    except Exception as e:
        print("AI response error:", e)
        return jsonify({"answer": "Sorry, I couldn't process your request."}), 500

# ===== RUN SERVER =====
if __name__ == "__main__":
    app.run(debug=True)
