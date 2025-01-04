import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../AxiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        try {
            const response = await axiosInstance.post('/login', credentials);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            console.error(err.response?.data?.message || 'Login failed.');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');

    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
