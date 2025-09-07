import os
import pickle
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

# (Model initialization and loading code remains the same)
ckd_model = None
sepsis_model = None
# ... etc.

try:
    print("--- Loading models... ---")
    with open('medical_models/ckd_model.pkl', 'rb') as f:
        ckd_model = pickle.load(f)
    print("CKD model loaded.")
    with open('medical_models/sepsis_model.pkl', 'rb') as f:
        sepsis_model = pickle.load(f)
    print("Sepsis model loaded.")
    brain_tumor_model = tf.keras.models.load_model('medical_models/brain_tumor_model.keras')
    print("Brain Tumor model loaded.")
    pneumonia_model = tf.keras.models.load_model('medical_models/pneumonia_model.keras')
    print("Pneumonia model loaded.")
    lung_cancer_model = tf.keras.models.load_model('medical_models/lung_cancer_model.keras')
    print("Lung Cancer model loaded.")
    print("\n--- All models loaded successfully. ---")
except Exception as e:
    print(f"!!! A CRITICAL ERROR OCCURRED WHILE LOADING MODELS: {e} !!!")

# (Helper functions and other endpoints remain the same)
def preprocess_image(image_file, target_size=(224, 224)):
    # ... (function code) ...
    img = Image.open(image_file.stream).convert('RGB')
    img = img.resize(target_size)
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

BRAIN_TUMOR_CLASSES = ['Glioma Tumor', 'Meningioma Tumor', 'No Tumor', 'Pituitary Tumor']
PNEUMONIA_CLASSES = ['Normal', 'Pneumonia']
LUNG_CANCER_CLASSES = ['Benign', 'Malignant', 'Normal']

@app.route('/')
def home():
    return "Backend server for the AI Diagnostic Suite is running."

@app.route('/predict/ckd', methods=['POST'])
def predict_ckd():
    # ... (this function is correct) ...
    if ckd_model is None: return jsonify({'error': 'CKD model is not loaded.'}), 500
    features = np.array(request.get_json(force=True)['features']).reshape(1, -1)
    prediction = ckd_model.predict(features)
    probability = ckd_model.predict_proba(features)
    return jsonify({'prediction': int(prediction[0]), 'probability_no_ckd': probability[0][0], 'probability_ckd': probability[0][1]})

# ==============================================================================
# CORRECTED SEPSIS PREDICTION FUNCTION (NOW EXPECTS 3 FEATURES)
# ==============================================================================
@app.route('/predict/sepsis', methods=['POST'])
def predict_sepsis():
    if sepsis_model is None:
        return jsonify({'error': 'Sepsis model is not loaded.'}), 500
    
    data = request.get_json(force=True)
    # The code now correctly expects exactly 3 features from the frontend
    features = np.array(data['features']).reshape(1, -1)
    
    # Make prediction
    prediction = sepsis_model.predict(features)
    probability = sepsis_model.predict_proba(features)
    
    return jsonify({'prediction': int(prediction[0]), 'probability_survived': probability[0][0], 'probability_died': probability[0][1]})

# ==============================================================================
# (The other image prediction functions remain the same)
# ==============================================================================
@app.route('/predict/brain_tumor', methods=['POST'])
def predict_brain_tumor():
    # ... (this function is correct) ...
    if brain_tumor_model is None: return jsonify({'error': 'Brain Tumor model not loaded.'}), 500
    file = request.files.get('file')
    if not file: return jsonify({'error': 'No file provided.'}), 400
    image = preprocess_image(file)
    prediction = brain_tumor_model.predict(image)
    return jsonify({'prediction': BRAIN_TUMOR_CLASSES[np.argmax(prediction)], 'confidence': float(np.max(prediction))})

@app.route('/predict/pneumonia', methods=['POST'])
def predict_pneumonia():
    # ... (this function is correct) ...
    if pneumonia_model is None: return jsonify({'error': 'Pneumonia model not loaded.'}), 500
    file = request.files.get('file')
    if not file: return jsonify({'error': 'No file provided.'}), 400
    image = preprocess_image(file)
    prediction = pneumonia_model.predict(image)[0][0]
    predicted_class = PNEUMONIA_CLASSES[1] if prediction > 0.5 else PNEUMONIA_CLASSES[0]
    confidence = float(prediction) if predicted_class == 'Pneumonia' else 1 - float(prediction)
    return jsonify({'prediction': predicted_class, 'confidence': confidence})

@app.route('/predict/lung_cancer', methods=['POST'])
def predict_lung_cancer():
    # ... (this function is correct) ...
    if lung_cancer_model is None: return jsonify({'error': 'Lung Cancer model not loaded.'}), 500
    file = request.files.get('file')
    if not file: return jsonify({'error': 'No file provided.'}), 400
    image = preprocess_image(file)
    prediction = lung_cancer_model.predict(image)
    return jsonify({'prediction': LUNG_CANCER_CLASSES[np.argmax(prediction)], 'confidence': float(np.max(prediction))})

# --- Run the App ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)