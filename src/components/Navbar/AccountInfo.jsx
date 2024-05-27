"use client"

import { useAuth } from '@/hooks/useAuth';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import Link from "next/link";

const AccountInfo = ({ lang, dictionary }) => {

    const { auth } = useAuth();
    console.log(auth);

    return (
        <>
            <Link href={`/${lang}/account/${auth?.loggedInUserInfo?.id}`}
                className="flex justify-center items-center text-center text-gray-700 hover:text-primary transition relative  mx-3">
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
