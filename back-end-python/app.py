from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    try:
        data = request.get_json()
        text_to_analyze = data['text']

        sent_pipeline = pipeline("sentiment-analysis")
        result = sent_pipeline(text_to_analyze)

        sentiment_label, sentiment_score = result[0]['label'], result[0]['score']
        response = jsonify({'sentiment_label': sentiment_label, 'sentiment_score': sentiment_score})

    except KeyError as e:
        # Handle missing 'text' key in the JSON payload
        response = jsonify({'error': f'Missing key: {str(e)}'}), 400

    except Exception as e:
        # Handle other exceptions
        response = jsonify({'error': str(e)}), 500

    return response


@app.route('/get-text', methods=['GET'])
def get_text():
    try:
        response = jsonify({'sentiment_label': "Hello World Chanul"})

    except KeyError as e:
        # Handle missing 'text' key in the JSON payload
        response = jsonify({'error': f'Missing key: {str(e)}'}), 400

    except Exception as e:
        # Handle other exceptions
        response = jsonify({'error': str(e)}), 500

    return response

if __name__ == "__main__": 
    app.run(debug=True)
