// components/PrivateRoute.tsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// Define the props for PrivateRoute
type Props = {
    children: React.ReactNode;
    allowedRoles?: string[];
};

// A PrivateRoute component that checks for authentication and role-based access
// Usage: <PrivateRoute allowedRoles={['admin', 'user']}><YourComponent /></PrivateRoute>
const PrivateRoute = ({ children, allowedRoles }: Props) => {

    const auth = useContext(AuthContext);

    // Ensure auth context is available
    if (!auth) throw new Error("AuthContext is missing");

    const { isAuthenticated, user } = auth;

    // If not authenticated, redirect to login
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    // If roles are specified, check if the user's role is allowed
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    
    // If authenticated and authorized, render the child components
    return children;
};

export default PrivateRoute;
