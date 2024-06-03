"use client"


import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import { faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const LogInDetails = ({ lang, dictionary, websiteURL }) => {


    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();
    const router = useRouter();


    return (
        <>
            {(modifiedAuth?.sessionInfo?.user?.name) ?
                <>
                    <div className='flex items-center'>
                        {(modifiedAuth?.sessionInfo?.user?.image) ?
                            <div className='border-2 border-white rounded-full mr-4'>
                                <Image
                                    src={modifiedAuth?.sessionInfo?.user?.image}
                                    alt={modifiedAuth?.sessionInfo?.user?.name}
                                    height={35}
                                    width={35}
                                    className='rounded-full'
                                />
                            </div>
                            :
                            <div className='bg-white h-[40px] w-[40px] rounded-full mr-4 flex justify-center items-center font-bold text-lg'>
                                {modifiedAuth?.sessionInfo?.user?.username?.[0]}
                            </div>
                        }

                        <div
                            className='bg-white h-[40px] w-[40px] rounded-full flex items-center cursor-pointer'
                            title="Log Out"
                            onClick={async () => {
                                setModifiedAuth(null);
                                await signOut({ callbackUrl: `${websiteURL}/${lang}/login` });
                                // await signOut();
                                // router.push(`/${lang}/login`);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faSignOut}
                                width={35}
                                height={35}
                                color={'#fd3d57'}
                            />
                        </div>

                    </div>
                </>
                :
                <Link
                    className='bg-white h-[40px] w-[40px] rounded-full flex items-center'
                    title="Log In"
                    href={`/${lang}/login`}
                >
                    <FontAwesomeIcon
                        icon={faSignIn}
                        width={35}
                        height={35}
                        color={'#fd3d57'}
                    />
                </Link>

            }

        </>
    )
}

export default LogInDetails
