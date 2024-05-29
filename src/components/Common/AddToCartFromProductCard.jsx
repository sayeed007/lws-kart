"use client"


import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'

const AddToCartFromProductCard = ({ dictionary, itemInfo }) => {


    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const addToCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('/api/auth/cart', {
                productId: itemInfo?.id,
                userId: modifiedAuth?.sessionInfo?.user?.id,
                addedTime: new Date(),
                expirationTime: new Date(new Date().getTime() + 30 * 60 * 1000), // 30 minutes later,
                productCount: 1
            }, {
                headers: {
                    'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                    'Content-Type': 'application/json'
                }
            });
            setLoading(false);
            setSuccess(true);

            if (response?.data?.newItem) {
                setModifiedAuth({
                    ...modifiedAuth,
                    cartItems: [
                        ...modifiedAuth?.cartItems,
                        response?.data?.newItem
                    ]
                });
                Cookies.set('auth', JSON.stringify({
                    ...modifiedAuth,
                    cartItems: [
                        ...modifiedAuth?.cartItems,
                        response?.data?.newItem
                    ]
                }));
            } else {

            }

        } catch (error) {
            setLoading(false);
            setError(error?.response?.data?.message || 'Something went wrong');
            console.error('Add to wishlist error:', error);
        }
    };


    return (
        <>
            <div
                onClick={() => addToCart()}
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition cursor-pointer">
                {dictionary?.addToCart}
            </div>
        </>
    )
}

export default AddToCartFromProductCard
