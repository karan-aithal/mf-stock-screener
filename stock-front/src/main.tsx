//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';

// If you want to use routing and protected routes, you can set up
// automatic route rendering in a React app using React Router and context-based authentication.
// implement authenticated, role-based access control and login state management.
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";


// Import this once in your root file
// main.tsx or index.tsx
// This ensures all global styles, variables, mixins, and shared components are available across the app.
// and you don’t need to import them again in Components/Page.tsx
import "./styles/app.scss";

// Load saved theme from localStorage
// persists across reloads using localStorage
const savedTheme = localStorage.getItem('theme');
const defaultTheme = savedTheme || 'theme-light';

// Apply theme class to <body> in index.html
document.body.classList.remove('theme-light', 'theme-dark');
document.body.classList.add(defaultTheme);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

