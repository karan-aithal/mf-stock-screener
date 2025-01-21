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