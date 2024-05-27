"use client"


import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const LogInDetails = ({ lang, dictionary }) => {


    const { auth } = useAuth();


    return (
        <>
            {(auth?.sessionInfo?.user?.image) ?
                <>
                    <div className='border-2 border-white rounded-full'>
                        <Image
                            src={auth?.sessionInfo?.user?.image}
                            alt={auth?.sessionInfo?.user?.name}
                            height={35}
                            width={35}
                            className='rounded-full'
                        />
                    </div>
                </>
                :
                <Link
                    href={`/${lang}/login`}
                    className={`text-gray-200 hover:text-white transition`}>
                    {dictionary?.log_in}
                </Link>
            }

        </>
    )
}

export default LogInDetails
