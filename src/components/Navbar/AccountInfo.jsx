/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from "next/link";
import { useEffect } from 'react';

const AccountInfo = ({ lang, dictionary, session }) => {

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    // console.log(modifiedAuth);
    // console.log(session);


    useEffect(() => {

        if (!modifiedAuth && session?.user?.email) {

            const fetchUserDetails = async () => {
                try {

                    const response = await axios.get(`/api/auth/userSession`);

                    // console.log(response?.data);

                    Cookies.set('auth', JSON.stringify(response?.data));
                    setModifiedAuth(response?.data);

                } catch (error) {
                    console.error('Fetch error:', error);
                }
            };

            fetchUserDetails();
        }
        // else if (!session) {
        //     Cookies.remove('auth');
        //     setModifiedAuth(null);
        // }

    }, [modifiedAuth, session]);

    return (
        <>
            <Link
                href={modifiedAuth ? `/${lang}/account/${modifiedAuth?.sessionInfo?.user?.id}` : `/${lang}/login`}
                className="flex justify-center items-center text-center text-gray-700 hover:text-primary transition relative  mx-3"
                title="User Account"
            >
                <div className="text-2xl border border-primary rounded-full w-[30px] h-[30px]">

                    <FontAwesomeIcon
                        icon={faUser}
                        width={24}
                        height={24}
                        color={'#FD3D57'}
                    />

                </div>

            </Link>
        </>
    )
}

export default AccountInfo
