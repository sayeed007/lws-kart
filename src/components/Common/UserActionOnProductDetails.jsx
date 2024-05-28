"use client"


import { faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'
import IncrementOrDecrement from './utilities/IncrementOrDecrement'
import { useModifiedAuth } from '@/hooks/useModifiedAuth'

const UserActionOnProductDetails = ({ productInfo, dictionary }) => {

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [addToCartValue, setAddToCartValue] = useState(4);

    const addToCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('/api/auth/cart', {
                productId: itemInfo?.id,
                userId: modifiedAuth?.sessionInfo?.user?.id,
                addedTime: new Date(),
                expirationTime: new Date(new Date().getTime() + 30 * 60 * 1000), // 30 minutes later,
                productCount: addToCartValue
            }, {
                headers: {
                    'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                    'Content-Type': 'application/json'
                }
            });
            setLoading(false);
            setSuccess(true);

            console.log(response);

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

    const addToWishlist = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('/api/auth/wishlist', {
                productId: productId,
                userId: modifiedAuth?.sessionInfo?.user?.id,
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
                    wishlistItems: [
                        ...modifiedAuth?.wishlistItems,
                        response?.data?.newItem
                    ]
                });

                Cookies.set('auth', JSON.stringify({
                    ...modifiedAuth,
                    wishlistItems: [
                        ...modifiedAuth?.wishlistItems,
                        response?.data?.newItem
                    ]
                }));

            } else {

            }

        } catch (error) {
            setLoading(false);
            setError(error.response.data.message || 'Something went wrong');
            console.error('Add to wishlist error:', error);
        }
    };


    return (
        <>

            <div className="mt-4">
                <h3 className="text-gray-800 font-semibold uppercase mb-1">
                    {dictionary?.quantity}
                </h3>

                {/* INCREMENT OR DECREMENT */}
                <IncrementOrDecrement
                    value={addToCartValue}
                    setValue={setAddToCartValue}
                />

            </div>

            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-2">

                {/* <Link
                    href="#"
                    className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                    <FontAwesomeIcon
                        icon={faShoppingBag}
                        width={24}
                        height={24}
                        color={'white'}
                    />
                    {dictionary?.addToCart}
                </Link> */}

                <div
                    onClick={() => addToCart()}
                    className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                    <FontAwesomeIcon
                        icon={faShoppingBag}
                        width={24}
                        height={24}
                        color={'white'}
                    />
                    {dictionary?.addToCart}
                </div>

                {/* <Link href="#"
                    className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                    <FontAwesomeIcon
                        icon={faHeart}
                        width={24}
                        height={24}
                        color={'black'}
                    />
                    {dictionary?.wishList}
                </Link> */}

                <div
                    onClick={() => addToWishlist()}
                    className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                    <FontAwesomeIcon
                        icon={faHeart}
                        width={24}
                        height={24}
                        color={'black'}
                    />
                    {dictionary?.wishList}
                </div>
            </div>


        </>
    )
}

export default UserActionOnProductDetails
