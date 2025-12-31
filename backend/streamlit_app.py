import streamlit as st
import tensorflow as tf
import joblib
import numpy as np
from PIL import Image
import os

# --- PAGE CONFIGURATION ---
st.set_page_config(
    page_title="Happy Health AI Suite",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- PATH SETUP ---
# This ensures we find the 'medical_models' folder no matter where the script runs
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "medical_models")

# --- MODEL LOADING FUNCTIONS (Cached for Performance) ---
@st.cache_resource
def load_keras_model(filename):
    """Loads .keras or .h5 models (TensorFlow/Keras)"""
    path = os.path.join(MODEL_DIR, filename)
    try:
        model = tf.keras.models.load_model(path)
        return model
    except Exception as e:
        st.error(f"Error loading {filename}: {e}")
        return None

@st.cache_resource
def load_sklearn_model(filename):
    """Loads .pkl models (Scikit-Learn/Joblib)"""
    path = os.path.join(MODEL_DIR, filename)
    try:
        model = joblib.load(path)
        return model
    except Exception as e:
        st.error(f"Error loading {filename}: {e}")
        return None

# --- IMAGE PREPROCESSING FUNCTION ---
def preprocess_image(image, target_size=(150, 150)):
    """
    Resizes and normalizes the image for the AI model.
    IMPORTANT: Change target_size to (224, 224) if your model expects that!
    """
    if image.mode != "RGB":
        image = image.convert("RGB")
    
    img = image.resize(target_size)
    img_array = np.array(img)
    img_array = img_array / 255.0  # Normalize pixel values to [0,1]
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

# --- SIDEBAR NAVIGATION ---
st.sidebar.title("🏥 Happy Health AI")
st.sidebar.write("### Diagnostic Modules")
app_mode = st.sidebar.radio("Select Disease:", 
    ["Pneumonia (X-Ray)", 
     "Brain Tumor (MRI)", 
     "Lung Cancer (CT Scan)", 
     "Chronic Kidney Disease (CKD)", 
     "Sepsis Prediction"])

st.sidebar.markdown("---")
st.sidebar.caption("Systems Architecture Portfolio\nby Karthikeya")

# --- MAIN APP LOGIC ---

# 1. PNEUMONIA DETECTION
if app_mode == "Pneumonia (X-Ray)":
    st.header("🫁 Pneumonia Detection AI")
    st.write("Upload a chest X-Ray image to detect signs of pneumonia.")
    
    uploaded_file = st.file_uploader("Upload X-Ray", type=["jpg", "png", "jpeg"])
    
    if uploaded_file:
        image = Image.open(uploaded_file)
        st.image(image, caption="Uploaded X-Ray", width=300)
        
        if st.button("Analyze X-Ray"):
            with st.spinner("Processing image..."):
                model = load_keras_model("pneumonia_model.keras")
                if model:
                    # NOTE: Ensure (150, 150) matches your training input size
                    processed_img = preprocess_image(image, target_size=(150, 150))
                    prediction = model.predict(processed_img)
                    
                    # Assuming binary classification: 0=Normal, 1=Pneumonia
                    score = prediction[0][0]
                    st.write(f"**Confidence Score:** {score:.4f}")
                    
                    if score > 0.5:
                        st.error(f"🚨 RESULT: PNEUMONIA DETECTED")
                    else:
                        st.success(f"✅ RESULT: NORMAL")

# 2. BRAIN TUMOR DETECTION
elif app_mode == "Brain Tumor (MRI)":
    st.header("🧠 Brain Tumor Detection AI")
    st.write("Upload a Brain MRI scan for tumor analysis.")
    
    uploaded_file = st.file_uploader("Upload MRI", type=["jpg", "png", "jpeg"])
    
    if uploaded_file:
        image = Image.open(uploaded_file)
        st.image(image, caption="Uploaded MRI", width=300)
        
        if st.button("Analyze MRI"):
            with st.spinner("Scanning..."):
                model = load_keras_model("brain_tumor_model.keras")
                if model:
                    # Brain tumor models often use 224x224
                    processed_img = preprocess_image(image, target_size=(224, 224))
                    prediction = model.predict(processed_img)
                    
                    # Logic depends on if you used Binary or Categorical
                    if prediction.shape[1] == 1:
                        if prediction[0][0] > 0.5:
                            st.error("🚨 TUMOR DETECTED")
                        else:
                            st.success("✅ NO TUMOR DETECTED")
                    else:
                        st.info(f"Raw Prediction Vector: {prediction}")

# 3. LUNG CANCER DETECTION
elif app_mode == "Lung Cancer (CT Scan)":
    st.header("🫁 Lung Cancer Detection AI")
    uploaded_file = st.file_uploader("Upload CT Scan", type=["jpg", "png"])
    
    if uploaded_file and st.button("Analyze CT Scan"):
        model = load_keras_model("lung_cancer_model.keras")
        if model:
            image = Image.open(uploaded_file)
            processed_img = preprocess_image(image, target_size=(224, 224))
            prediction = model.predict(processed_img)
            st.write("Prediction Result:", prediction)

# 4. CHRONIC KIDNEY DISEASE (Tabular)
elif app_mode == "Chronic Kidney Disease (CKD)":
    st.header("🧪 CKD Risk Prediction")
    st.info("Enter the patient's vitals below.")
    
    # NOTE: You MUST update these inputs to match exactly what you trained on!
    # If your model expects 10 inputs and you give 4, it will crash.
    col1, col2 = st.columns(2)
    with col1:
        age = st.number_input("Age", 0, 100, 50)
        bp = st.number_input("Blood Pressure", 50, 200, 80)
    with col2:
        sg = st.number_input("Specific Gravity", 1.000, 1.050, 1.020)
        al = st.number_input("Albumin (0-5)", 0, 5, 0)
        
    if st.button("Predict CKD"):
        model = load_sklearn_model("ckd_model.pkl")
        if model:
            try:
                # Create input array. ORDER MATTERS!
                input_data = np.array([[age, bp, sg, al]])
                prediction = model.predict(input_data)
                
                if prediction[0] == 1:
                    st.error("High Risk of CKD")
                else:
                    st.success("Low Risk")
            except ValueError as e:
                st.error(f"⚠️ Input Shape Error: The model expects different inputs than provided. Details: {e}")

# 5. SEPSIS PREDICTION (Tabular)
elif app_mode == "Sepsis Prediction":
    st.header("🩸 Sepsis Risk Assessment")
    
    # Generic placeholders - Update these based on your Sepsis dataset columns
    p1 = st.number_input("Plasma Glucose", 0, 300)
    p2 = st.number_input("Blood Pressure", 0, 200)
    p3 = st.number_input("Body Mass Index", 0.0, 60.0)
    p4 = st.number_input("Age", 0, 100)
    
    if st.button("Analyze Risk"):
        model = load_sklearn_model("sepsis_model.pkl")
        if model:
            try:
                input_data = np.array([[p1, p2, p3, p4]])
                prediction = model.predict(input_data)
                st.write(f"Prediction: {prediction}")
            except ValueError:
                st.error("⚠️ Error: Please update the input fields in code to match training features.")