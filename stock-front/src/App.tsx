import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import { useAuth } from './hooks/useAuth';

import React from 'react';
import type { JSX } from 'react';
import { useState } from 'react';
//import { LoginForm } from "./components/LoginPage";
import './styles/index.scss';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import type { AuthPageProps, ViewType, RegisterFormData, FormErrors } from '../src/types'
import { validateEmail, validatePassword , validateName} from '../src/utils/validation';



// function PrivateRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// }


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('welcome');

  const handleViewChange = (view: ViewType): void => {
    setCurrentView(view);
  };

  const renderCurrentView =  (): JSX.Element => {
    switch (currentView) {
      case 'login':
        return (
          <LoginPage 
            onSwitchToRegister={() => handleViewChange('register')}
            onBack={() => handleViewChange('welcome')}
          />
        );
      case 'register':
        return (
          <RegisterPage 
            onSwitchToLogin={() => handleViewChange('login')}
            onBack={() => handleViewChange('welcome')}
          />
        );
      default:
        return (
          <>Welcome Page
          <LoginPage 
            onSwitchToRegister={() => handleViewChange('register')}
            onBack={() => handleViewChange('welcome')}
          />
          </>
          // <WelcomeScreen 
          //   onNavigateToLogin={() => handleViewChange('login')}
          //   onNavigateToRegister={() => handleViewChange('register')}
          // />
        );
    }
  };

   return (
    <>
      {/* <style>{globalStyles}</style>
      <style>{componentStyles}</style>
      <style>{loginPageStyles}</style>
      <style>{registerPageStyles}</style>
      <style>{welcomePageStyles}</style> */}
      <div className="app">
        <div className="auth-container">
          {renderCurrentView()}
        </div>
      </div>
    </>
  );
};

export default App;
    // <Routes>
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/register" element={<Register />} />
    //   <Route
    //     path="/"
    //     element={
    //       <PrivateRoute>
    //         <Dashboard />
    //       </PrivateRoute>
    //     }
    //   />
    //   <Route path="*" element={<Navigate to="/" />} />
    // </Routes>
 