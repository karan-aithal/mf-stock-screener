import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import WelcomePage from './components/WelcomePage';
// import Dashboard from "./pages/Dashboard";
// import Blog from "./pages/Blog";
import PrivateRoute from "./routes/PrivateRoute";


import type { ViewType } from '../src/types';
import DarkVeil from './components/DarkVeil';
import ThemeToggle from './components/ThemeToggle';


// function PrivateRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// }

const App = () => {
  return (
    <>
      <DarkVeil />
      <Routes>
        {/* Public pages */}
        {/* <Route path="/" element={<WelcomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        {/* Protected pages */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["user", "admin"]}>
              {/* <Dashboard /> */}
              <><WelcomePage></WelcomePage></>
              <h2>Dashboard - Protected Route</h2>
            </PrivateRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              {/* <Blog /> */}
              <h2>Blog - Admin Only</h2>
            </PrivateRoute>
          }
        />

        {/* Unauthorized + fallback */}
        <Route path="/unauthorized" element={<h2>Access Denied</h2>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;












// const App: React.FC = () => {
//   const [currentView, setCurrentView] = useState<ViewType>('welcome');

//   const handleViewChange = (view: ViewType): void => {
//     setCurrentView(view);
//   };

//   const renderCurrentView = (): JSX.Element => {
//     switch (currentView) {
//       case 'login':
//         return (
//           <LoginPage
//             onSwitchToRegister={() => handleViewChange('register')}
//             onBack={() => handleViewChange('welcome')}
//           />
//         );
//       case 'register':
//         return (
//           <RegisterPage
//             onSwitchToLogin={() => handleViewChange('login')}
//             onBack={() => handleViewChange('welcome')}
//           />
//         );
//       default:
//         return (
//           <>
//           <WelcomePage
//             onNavigateToLogin={() => handleViewChange('login')}
//             onNavigateToRegister={() => handleViewChange('register')}
//           />
//            </>
//         );
//     }
//   };

//   return (
//     <>
//       <ThemeToggle />
//       <div className="app">
//         <div className="auth-container">
//           {renderCurrentView()}
//         </div>
//       </div>
//     </>
//   );
// };
// export default App;