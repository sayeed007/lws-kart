"use client";

import { useEffect, useState } from 'react';

import { AuthContext } from '@/contexts';
import axios from 'axios';
import { useSession, signOut } from "next-auth/react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function AuthProvider({ children }) {

    const { session } = useSession();
    const router = useRouter();

    const [modifiedAuth, setModifiedAuth] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {

            const fetchUserDetails = async () => {
                try {

                    const response = await axios.get(`/api/auth/userSession`);

                    // IF USER REQUESTED ANYTHING ON LAST HIT

                    const lastAction = Cookies?.get('lastAction') ? JSON.parse(Cookies?.get('lastAction')) : {};

                    if (lastAction.action && response?.data?.sessionInfo?.user?.id) {
                        madeActionOnLastRequest(lastAction, response);
                    } else {
                        setModifiedAuth(response?.data);
                    }

                } catch (error) {
                    console.error('User Session information fetching error:', error);
                }
            };

            const madeActionOnLastRequest = async (lastAction, response) => {

                switch (lastAction?.action) {

                    case 'addToWishlist':

                        // ADD ITEM TO WISHLIST
                        const wishResponse = await axios.post('/api/auth/wishlist', {
                            productId: lastAction?.productId,
                            userId: response?.data?.sessionInfo?.user?.id,
                        }, {
                            headers: {
                                'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                                'Content-Type': 'application/json'
                            }
                        });

                        // IF SUCCESSFUL THEN SHOW MESSAGE AND SET MODIFIED AUTH
                        if (wishResponse?.data?.wishedProduct) {

                            toast.success("Your last request to add product in your wishlist is successful, showing your wishlist.",
                                {
                                    onClose: () => {
                                        setModifiedAuth({
                                            ...response?.data,
                                            wishlistItems: [...wishResponse?.data?.wishedProduct]
                                        });

                                        Cookies.remove('lastAction');
                                        router.push(`/${lastAction?.lang}/wishList`);
                                    }
                                });

                        } else {
                            toast.warning(response?.data?.message);
                        }

                        break;
                    case 'addToCart':
                        const cartResponse = await axios.post('/api/auth/cart', {
                            productId: lastAction?.productId,
                            userId: response?.data?.sessionInfo?.user?.id,
                            addedTime: new Date(),
                            expirationTime: new Date(new Date().getTime() + 30 * 60 * 1000), // 30 minutes later,
                            productCount: lastAction?.productCount
                        }, {
                            headers: {
                                'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                                'Content-Type': 'application/json'
                            }
                        });


                        if (cartResponse?.data?.addToCartList) {

                            toast.success("Your last request to add product in your cart is successful, showing your cart.",
                                {
                                    onClose: () => {
                                        setModifiedAuth({
                                            ...response?.data,
                                            cartItems: response.data?.cartItems
                                        });

                                        Cookies.remove('lastAction');
                                        router.push(`/${lastAction?.lang}/cart`);
                                    }
                                });

                        } else {
                            toast.error(response?.data?.message);
                        }

                        break;

                    case 'wishListVisit':
                        toast.success("Your last request was to view your wishlist, showing your wishList.",
                            {
                                onClose: () => {
                                    setModifiedAuth({
                                        ...response?.data,
                                    });

                                    Cookies.remove('lastAction');
                                    router.push(`/${lastAction?.lang}/wishList`);
                                }
                            });
                        break;

                    case 'cartVisit':
                        toast.success("Your last request was to view your cart, showing your cart.",
                            {
                                onClose: () => {
                                    setModifiedAuth({
                                        ...response?.data,
                                    });

                                    Cookies.remove('lastAction');
                                    router.push(`/${lastAction?.lang}/cart`);
                                }
                            });
                        break;

                    case 'profileVisit':
                        toast.success("Your last request was to view your profile, showing you your profile.",
                            {
                                onClose: () => {
                                    setModifiedAuth({
                                        ...response?.data,
                                    });

                                    Cookies.remove('lastAction');
                                    router.push(`/${lastAction?.lang}/account/${response?.data?.sessionInfo?.user?.id}`);
                                }
                            });
                        break;


                    default:
                        break;

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

