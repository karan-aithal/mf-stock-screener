import React, { createContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '../services/api';


type AuthContextType = {
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
};


export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));


    useEffect(() => {
        setAuthToken(token);
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
    }, [token]);


    const login = async (email: string, password: string) => {
        const res = await api.post('/auth/login', { email, password });
        setToken(res.data.access_token);
    };


    const register = async (email: string, password: string) => {
        await api.post('/auth/register', { email, password });
    };


    const logout = () => setToken(null);


    const value = useMemo(
        () => ({ token, isAuthenticated: !!token, login, register, logout }),
        [token]
    );


    return <AuthContext.Provider value={ value }> { children } </AuthContext.Provider>;
};