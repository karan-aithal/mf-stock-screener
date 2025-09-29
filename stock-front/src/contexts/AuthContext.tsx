import React, { createContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '../services/api';

// Define the shape of the user object and context
// AuthContext to include user + role
type User = {
    id: string;
    email: string;
    role: string;
};


type AuthContextType = {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
};


export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    // Added user state
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        // Whenever the token changes, update the auth header and localStorage
        setAuthToken(token);

        if (token) {

            localStorage.setItem('token', token);
            // Fetch user details from token or backend

            // Option 1: decode JWT if it contains role
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ id: payload.userId, email: payload.email, role: payload.role });

            // Option 2: fetch user details from backend
            // Fetch user details when token is set
            api.get('/auth/me')
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    // If token is invalid, clear it
                    setToken(null);
                    setUser(null);
                });
        }

        else {
            localStorage.removeItem('token');
            setUser(null);
        }

    }, [token]);

    // Login function to authenticate and get token from backend
    const login = async (email: string, password: string) => {
        const res = await api.post('/auth/login', { email, password });
        setToken(res.data.access_token);
    };

    // Register function to create a new user
    const register = async (email: string, password: string) => {
        await api.post('/auth/register', { email, password });
    };


    const logout = () => setToken(null);

    // Memoize the context value to optimize performance
    // include user in the dependency array
    const value = useMemo(
        () => ({ token, isAuthenticated: !!token, user, login, register, logout }),
        [token]
    );

    // Provide the context to child components
    // include user in the provider value
    // Now any component can access user info and role from AuthContext
    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};