import pyttsx3
import os
import google.generativeai as aura
import PyPDF2

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

# ===== SPEECH ENGINE =====
engine = pyttsx3.init()
voices = engine.getProperty("voices")
engine.setProperty("voice", voices[1].id)
engine.setProperty("rate", 140)
engine.setProperty("volume", 1.0)

def talk(text):
    print(text)
    engine.say(text)
    engine.runAndWait()

# ===== MAIN LOOP (TEXT INPUT ONLY) =====
talk("Hi, I am Aura. Ask me about villages from the dataset or for generic waterborne disease prevention tips.")

while True:
    command = input("Ask Aura (type 'exit' to quit): ").strip().lower()
    if command == 'exit':
        talk("Goodbye!")
        break

    try:
        # Generic health/prevention questions
        if "waterborne" in command or "disease" in command or "prevention" in command or "health tip" in command:
            tips = (
                "Here are generic prevention tips for waterborne diseases:\n"
                "- Drink only safe, filtered, or boiled water.\n"
                "- Wash hands regularly with soap and clean water.\n"
                "- Avoid raw or undercooked food.\n"
                "- Keep water storage containers clean and covered.\n"
                "- Maintain hygiene and sanitation in your surroundings.\n"
            )
            talk(tips)
        # Anything else → dataset queries
        else:
            response = model.generate_content(
                f"User asked: {command}\n\n"
                f"Refer strictly to the PDF dataset:\n{pdf_knowledge[:3000]}"
            )
            talk(response.text)
    except Exception as e:
        print("AI response error:", e)
        talk("Sorry, I couldn't process your request.")
