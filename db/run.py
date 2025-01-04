from app import create_app
import logging

app = create_app()

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    app.logger.setLevel(logging.DEBUG)
    app.run(debug=True, port=5000)