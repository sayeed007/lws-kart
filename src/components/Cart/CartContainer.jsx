"use client"

import { useModifiedAuth } from '@/hooks/useModifiedAuth';

import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EmptyBox from '../../../public/assets/images/EmptyBox.jpeg';
import SingleCartProduct from './SingleCartProduct';

const CartContainer = ({ dictionary, lang }) => {

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const userId = modifiedAuth?.id ? modifiedAuth.id : modifiedAuth?.sessionInfo?.user?.id;

    const [userCartItems, setUserCartItems] = useState(modifiedAuth?.cartItems ? modifiedAuth?.cartItems : []);
    const [refetchData, setRefetchData] = useState(false);

    useEffect(() => {

        if (userId) {
            const getUserCartItems = async () => {
                try {

                    const response = await axios.get(`/api/auth/cart/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                            'Content-Type': 'application/json'
                        }
                    });

                    setModifiedAuth({
                        ...modifiedAuth,
                        cartItems: [...response?.data]
                    });

                    Cookies.set('auth', JSON.stringify({
                        ...modifiedAuth,
                        cartItems: [...response?.data]
                    }));

                    setUserCartItems([...response?.data]);


                } catch (error) {
                    toast.error('Delete to cart error:', error);
                    console.error('Delete to cart error:', error);
                }
            };


            getUserCartItems();
        }

    }, [refetchData]);




    return (
        <>
            {(userCartItems?.length > 0) ?
                <>
                    {userCartItems?.map((cartProduct) => {
                        return (
                            <SingleCartProduct
                                dictionary={dictionary}
                                key={cartProduct?.id}
                                cartProduct={cartProduct}
                                refetchData={refetchData}
                                setRefetchData={setRefetchData}
                            />
                        )
                    })
                    }

                    <div className='flex justify-center mt-4'>
                        <Link
                            href={`/${lang}/checkout`}
                            className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium cursor-pointer">
                            {dictionary?.checkout}
                        </Link>
                    </div>


                </>
                :
                <div className="flex flex-col w-full justify-center items-center">
                    <Image
                        src={EmptyBox}
                        alt={'No Ongoing Order'}
                        width={300}
                        height={150}
                    />
                    <div className="text-xl my-3 font-bold">
                        {dictionary?.noItemInCart}
                    </div>
                </div>
            }
        </>
    )
}

export default CartContainer
