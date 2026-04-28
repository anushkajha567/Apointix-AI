# predict.py - ML Prediction API for Breast Cancer Detection
# Uses Logistic Regression model trained on Wisconsin Breast Cancer Dataset

from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load('model/logistic_regression_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = np.array(data['features']).reshape(1, -1)
        prediction = model.predict(features)
        probability = model.predict_proba(features)[0][1]
        
        result = {
            'prediction': int(prediction[0]),
            'probability': float(probability),
            'diagnosis': 'Malignant' if prediction[0] == 1 else 'Benign'
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)