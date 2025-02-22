# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

frontend/
├── public/                        # Static assets
│   ├── index.html                 # Entry point
│   └── favicon.ico
├── src/                           # Source code
│   ├── App.tsx                    # Main React app component
│   ├── index.tsx                  # React entry point
│   ├── components/                # Reusable components
│   │   ├── Auth/                  # Authentication components
│   │   │   ├── Login.tsx          # Login form
│   │   │   └── Register.tsx       # Registration form
│   │   ├── Charts/                # Chart components
│   │   │   ├── CryptoChart.tsx    # Crypto coin chart
│   │   │   ├── MutualFundChart.tsx# Mutual fund chart
│   │   │   └── StockChart.tsx     # Stock chart
│   │   ├── Alerts/                # Alert components
│   │   │   ├── CryptoAlert.tsx    # Crypto alerts
│   │   │   ├── MutualFundAlert.tsx# Mutual fund alerts
│   │   │   └── StockAlert.tsx     # Stock alerts
│   │   └── Dashboard.tsx          # Main dashboard component
│   ├── contexts/                  # Context API for global state
│   │   └── AuthContext.tsx        # Authentication state
│   ├── models/                    # Data models
│   │   ├── Crypto.ts              # Crypto data model
│   │   ├── MutualFund.ts          # Mutual fund data model
│   │   └── Stock.ts               # Stock data model
│   ├── services/                  # API integration logic
│   │   ├── AuthService.ts         # Authentication API
│   │   ├── CryptoService.ts       # Crypto API
│   │   ├── MutualFundService.ts   # Mutual fund API
│   │   └── StockService.ts        # Stock API
│   ├── styles/                    # CSS styles
│   │   └── main.css               # Global styles
│   └── utils/                     # Utility functions
│       └── fetchWrapper.ts        # Wrapper for API calls
├── package.json                   # Frontend dependencies
└── tsconfig.json                  # TypeScript configuration
