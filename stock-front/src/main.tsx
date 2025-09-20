//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
// Import this once in your root file
// main.tsx or index.tsx
// This ensures all global styles, variables, mixins, and shared components are available across the app.
// and you don’t need to import them again in Component/Page.tsx
import "./styles/app.scss";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Theme>
          <App />
        </Theme>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

