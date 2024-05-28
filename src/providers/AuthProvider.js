"use client";

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { AuthContext } from '@/contexts';
import axios from 'axios';
// import { auth } from "../../auth";

export default function AuthProvider({ children }) {
    // const session = await auth();

    const [modifiedAuth, setModifiedAuth] = useState(null);

    useEffect(() => {
        let authData = null;
        if (typeof window !== 'undefined' && Cookies?.get('auth')) {
            authData = JSON?.parse(Cookies?.get('auth'));
            setModifiedAuth(authData);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ modifiedAuth, setModifiedAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

