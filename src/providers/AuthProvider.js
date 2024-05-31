"use client";

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { AuthContext } from '@/contexts';
import axios from 'axios';

export default function AuthProvider({ children }) {

    const [modifiedAuth, setModifiedAuth] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {

            const fetchUserDetails = async () => {
                try {

                    const response = await axios.get(`/api/auth/userSession`);

                    setModifiedAuth(response?.data);

                } catch (error) {
                    console.error('Fetch error:', error);
                }
            };

            fetchUserDetails();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ modifiedAuth, setModifiedAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

