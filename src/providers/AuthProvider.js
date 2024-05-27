"use client";

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { AuthContext } from '@/contexts';
import axios from 'axios';

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/auth/userSession');

                // Handle response.data as needed
                Cookies.set('auth', JSON.stringify(response.data));
                setAuth(response.data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount



    useEffect(() => {
        let authData = null;
        if (typeof window !== 'undefined' && Cookies?.get('auth')) {
            authData = JSON?.parse(Cookies?.get('auth'));
            setAuth(authData);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

