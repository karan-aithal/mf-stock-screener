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

-----------------------------------------------------------------------------

* Scss styling *
Each subfolder (base, components, pages) has an _index.scss that uses @forward to expose its internal styles.

🧩 If you want scoped styles (no global leakage), convert your SCSS files to modules:

Rename LoginPage.scss → LoginPage.module.scss
import styles from '../styles/pages/LoginPage.module.scss';
```

└─ stock-front
   ├─ eslint.config.js
   ├─ index.html
   ├─ package.json
   ├─ public
   │  ├─ icons
   │  │  └─ sprite.jpg
   │  └─ vite.svg
   ├─ README.md
   ├─ src
   │  ├─ App.tsx
   │  ├─ assets
   │  │  └─ react.svg
   │  ├─ components
   │  │  ├─ AddHoldingModal.tsx
   │  │  ├─ AddPortfolioModal.tsx
   │  │  ├─ Header.tsx
   │  │  ├─ LoginPage.tsx
   │  │  └─ RegisterPage.tsx
   │  ├─ contexts
   │  │  └─ AuthContext.tsx
   │  ├─ hooks
   │  │  └─ useAuth.ts
   │  ├─ index.css
   │  ├─ main.tsx
   │  ├─ routes
   │  │  ├─ Dashboard.tsx
   │  │  ├─ Login.tsx
   │  │  └─ Register.tsx
   │  ├─ services
   │  │  └─ api.ts
   │  ├─ styles
   │  │  ├─ app.scss
   │  │  ├─ base
   │  │  │  ├─ _animations.scss
   │  │  │  ├─ _index.scss
   │  │  │  ├─ _mixins.scss
   │  │  │  ├─ _typography.scss
   │  │  │  └─ _variables.scss
   │  │  ├─ components
   │  │  │  ├─ _components.scss
   │  │  │  └─ _index.scss
   │  │  ├─ layouts
   │  │  │  ├─ _index.scss
   │  │  │  └─ _portfolio.scss
   │  │  └─ pages
   │  │     ├─ LoginPage.scss
   │  │     ├─ RegistrationPage.scss
   │  │     ├─ WelcomePage.scss
   │  │     ├─ _hero.scss
   │  │     └─ _index.scss
   │  ├─ types
   │  │  ├─ auth.ts
   │  │  ├─ forms.ts
   │  │  └─ index.ts
   │  ├─ utils
   │  │  └─ validation.ts
   │  └─ vite-env.d.ts
   ├─ tsconfig.app.json
   ├─ tsconfig.json
   ├─ tsconfig.node.json
   ├─ vite.config.ts
   └─ yarn.lock

