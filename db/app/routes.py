from flask import Blueprint, render_template, jsonify
from firecrawl_service import fetch_firecrawl_data
import logging
import traceback

# Create blueprint
main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/get-data', methods=['GET'])
def get_data():
    try:
        data = fetch_firecrawl_data()
        if not data:
            return jsonify({"error": "No data returned"}), 500
        return jsonify(data)
    except Exception as e:
        error_traceback = traceback.format_exc()
        logging.error(f"Error fetching data: {str(e)}\n{error_traceback}")
        return jsonify({
            "error": str(e),
            "traceback": error_traceback
        }), 500