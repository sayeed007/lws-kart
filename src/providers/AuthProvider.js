"use client";

import { useEffect, useState } from 'react';

import { AuthContext } from '@/contexts';
import axios from 'axios';
import { useSession, signOut } from "next-auth/react";

export default function AuthProvider({ children }) {

    const { session } = useSession();

    const [modifiedAuth, setModifiedAuth] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {

            const fetchUserDetails = async () => {
                try {

                    const response = await axios.get(`/api/auth/userSession`);

                    setModifiedAuth(response?.data);

                } catch (error) {
                    console.error('User Session information fetching error:', error);
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

