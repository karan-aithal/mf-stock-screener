# mf-stock-screener

yarn install
yarn dev -- backend 
yarn start


backend/
├── src/
│   ├── app.ts                     # Main Express app
│   ├── config/                    # Configuration files
│   │   └── db.ts                  # Database connection setup
│   ├── controllers/               # Business logic
│   │   ├── authController.ts      # Authentication logic
│   ├── models/                    # Sequelize models
│   │   ├── index.ts               # Model index (Sequelize initialization)
│   │   └── userModel.ts           # User model
│   ├── routes/                    # API routes
│   │   └── authRoutes.ts          # Authentication routes
│   └── middlewares/               # Middleware (e.g., authentication)
│       └── authMiddleware.ts      # JWT-based authentication middleware
├── package.json                   # Backend dependencies
└── .env                           # Environment variables


backend-- 
nodemon
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

backend/
├── src/ 
│   ├── contexts/
│   ├── enums/
│   ├── hooks/
│   ├── models/
│   ├── middlewares/ 
│   ├── services/
│   ├── settings/
│   ├── utils/

stock-front/
├── src/ 
│   ├── components/
│   ├── contexts/
│   ├── enums/
│   ├── hooks/
│   ├── img/
│   ├── locales/
│   ├── models/
│   ├── middlewares/ 
│   ├── services/
│   ├── settings/
│   ├── themes/
│   ├── utils/
