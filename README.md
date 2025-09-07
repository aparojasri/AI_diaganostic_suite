
# 🩺 AI Diagnostic Suite - Happy Health

[](https://www.python.org/downloads/) [](https://reactjs.org/) [](https://flask.palletsprojects.com/) [](https://opensource.org/licenses/MIT)

A full-stack web application featuring five distinct AI models for preliminary medical diagnosis, built with a Python/Flask backend and a React/MUI frontend.

## 📖 Project Overview

The AI Diagnostic Suite is a comprehensive portfolio project that demonstrates the complete end-to-end lifecycle of a data science application. It begins with data exploration, cleaning, and model training in Jupyter Notebooks and culminates in a professional, interactive, and responsive web application. The project integrates five distinct machine learning and deep learning models to provide preliminary diagnostic insights for various medical conditions, showcasing skills in both data science and full-stack software engineering.

-----

## ✨ Key Features

  * **Five Distinct AI Models**: Covers both tabular data (CKD, Sepsis) and medical imaging (Brain Tumors, Pneumonia, Lung Cancer).
  * **Interactive UI**: A professional and user-friendly interface built with React and Material-UI (MUI), featuring data entry forms, image uploaders, and dynamic, detailed report generation.
  * **Full-Stack Architecture**: A clear separation between the Python/Flask backend (serving the models via a REST API) and the React frontend.
  * **Complete Data Science Showcase**: Each model in the UI includes a direct link to the corresponding Jupyter Notebook, allowing viewers to explore the data analysis and training process.
  * **Environment Management**: Uses professional practices like virtual environments (`venv`) for the backend and a `requirements.txt` file for dependency management.

-----

## 🩺 The Diagnostic Modules

1.  **Chronic Kidney Disease (CKD)**: A Random Forest model that predicts the presence of CKD based on 24 clinical parameters.
2.  **Sepsis Survival**: A Random Forest model that predicts patient survival outcome from Sepsis based on 3 key features.
3.  **Brain Tumor MRI Classification**: A deep learning model (using Transfer Learning with MobileNetV2) that classifies MRI scans into four categories: Glioma, Meningioma, Pituitary, or No Tumor.
4.  **Pneumonia Detection**: A deep learning model (MobileNetV2) that detects the presence of Pneumonia from chest X-ray images.
5.  **Lung Cancer Classification**: A deep learning model (MobileNetV2) that classifies CT scans into three categories: Benign, Malignant, or Normal.

-----

## 🛠️ Technology Stack

  * **Backend**: Python, Flask, TensorFlow/Keras, Scikit-learn, XGBoost, NumPy, Pillow, Flask-CORS
  * **Frontend**: React, Vite, JavaScript, Material-UI (MUI), Axios
  * **Data Science**: Jupyter Notebooks (run on Kaggle), Pandas
  * **Deployment & Tools**: Git, GitHub, VS Code, Thunder Client

-----

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### \#\#\# Prerequisites

  * [Python 3.11+](https://www.python.org/downloads/)
  * [Node.js and npm](https://nodejs.org/en/download/)
  * [Git](https://git-scm.com/downloads)

### \#\#\# Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/aparojasri/AI_diaganostic_suite.git
    cd AI_diaganostic_suite
    ```

2.  **Setup the Backend (Terminal 1):**

    ```bash
    # Navigate to the backend folder
    cd backend

    # Create and activate a virtual environment
    python -m venv venv
    .\venv\Scripts\activate

    # Install all required Python packages
    pip install -r requirements.txt
    ```

3.  **Setup the Frontend (Terminal 2):**

    ```bash
    # Navigate to the frontend folder
    cd frontend

    # Install all required npm packages
    npm install
    ```

### \#\#\# Running the Application

You will need two terminals running simultaneously.

1.  **Run the Backend Server (Terminal 1):**

    ```bash
    # Make sure you are in the 'backend' folder with (venv) active
    .\venv\Scripts\python.exe -m flask run
    ```

    The backend will be running on `http://127.0.0.1:5000`.

2.  **Run the Frontend UI (Terminal 2):**

    ```bash
    # Make sure you are in the 'frontend' folder
    node node_modules/vite/bin/vite.js
    ```

    The frontend will be running on `http://localhost:5173`. Open this URL in your browser to use the application.

-----

## 📂 Project Structure

```
AI_Diagnostic_Suite/
├── backend/                # Contains the Flask server and models
│   ├── medical_models/     # All 5 trained model files
│   ├── venv/               # The Python virtual environment
│   └── app.py              # The main Flask application
│   └── requirements.txt    # Backend dependencies
│
├── frontend/               # Contains the React UI
│   ├── src/                # All React components and assets
│   └── package.json        # Frontend dependencies
│
└── notebooks/              # The 5 data science Jupyter notebooks
    ├── 1_CKD_Diagnosis.ipynb
    └── ...
```

-----

## ⚠️ Disclaimer

This application and its models are for **educational and demonstrative purposes only**. They are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified health provider with any questions you may have regarding a medical condition.
