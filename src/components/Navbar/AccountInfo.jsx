/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';


const AccountInfo = ({ lang, dictionary, session }) => {
    const router = useRouter();
    const pathname = usePathname();

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    useEffect(() => {

        if (!modifiedAuth && session?.user?.email) {

            const fetchUserDetails = async () => {
                try {

                    const response = await axios.get(`/api/auth/userSession`);

                    setModifiedAuth(response?.data);

                } catch (error) {
                    console.error('User Session Information fetching error:', error);
                }
            };

            fetchUserDetails();
        } else {

        }

    }, [modifiedAuth, session]);


    return (
        <>
            <div
                onClick={() => {
                    if (modifiedAuth?.sessionInfo?.user?.id) {
                        router.push(`/${lang}/account/${modifiedAuth?.sessionInfo?.user?.id}`);
                    } else {
                        Cookies.set('lastAction', JSON.stringify({
                            lastRoute: pathname,
                            action: 'profileVisit',
                            productId: '',
                            productCount: 0,
                            lang: lang
                        }));
                        router.push(`/${lang}/login`);
                    }
                }}
                // href={modifiedAuth?.sessionInfo?.user?.id ? `/${lang}/account/${modifiedAuth?.sessionInfo?.user?.id}` : `/${lang}/login`}
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

            </div>
        </>
    )
}

export default AccountInfo
