# mf-stock-screener
mf-stock-screener

  "proxy": "http://localhost:5000",    
  // Added proxy to avoid CORS issues , This configuration tells the React development server to forward API requests to the Flask backend.

- Flask application serves the web tool.
- Zerodha API client fetches historical NAV data.
- Pandas calculates the 3-Year Average Annual Rolling Return.
- HTML/JavaScript provides the frontend interface for user input and result display.



Flask backend is configured with CORS support and provides the /calculate endpoint.
React frontend is set up to make POST requests to the Flask backend and display the calculated results.