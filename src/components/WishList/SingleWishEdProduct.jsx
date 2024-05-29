"use client"


import { calculateNewPrice } from '@/utils/data-util'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import DeleteSingleWishItem from './DeleteSingleWishItem'
import { useModifiedAuth } from '@/hooks/useModifiedAuth'

const SingleWishEdProduct = ({ dictionary, wishedProduct }) => {

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const addToCart = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post('/api/auth/cart', {
                productId: wishedProduct?.wishlistData?.productId,
                userId: wishedProduct?.wishlistData?.userId,
                addedTime: new Date(),
                expirationTime: new Date(new Date().getTime() + 30 * 60 * 1000), // 30 minutes later,
                productCount: 1
            }, {
                headers: {
                    'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                    'Content-Type': 'application/json'
                }
            });

            if (response?.data?.newItem) {

                // AS IT IS ADDED TO CART LETS REMOVE IT FROM WISHLIST
                const wishResponse = await axios.delete(`/api/auth/wishlist/${wishedProduct?.wishlistData?.id}`, {
                    headers: {
                        'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                        'Content-Type': 'application/json'
                    }
                });
                setLoading(false);
                setSuccess(true);

                if (response?.data) {
                    setModifiedAuth({
                        ...modifiedAuth,
                        wishlistItems: [
                            ...modifiedAuth?.wishlistItems?.filter((wishListItem) => wishListItem?.wishlistData?.id !== wishedProduct?.wishlistData?.id)
                        ],
                        cartItems: [
                            ...modifiedAuth?.cartItems,
                            response?.data?.newItem
                        ]
                    });

                    Cookies.set('auth', JSON.stringify({
                        ...modifiedAuth,
                        wishlistItems: [
                            ...modifiedAuth?.wishlistItems?.filter((wishListItem) => wishListItem?.wishlistData?.id !== wishedProduct?.wishlistData?.id)
                        ],
                        cartItems: [
                            ...modifiedAuth?.cartItems,
                            response?.data?.newItem
                        ]
                    }));

                } else {

                }


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
            <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">

                <div className="w-28">
                    <Image
                        src={wishedProduct?.images?.[0]}
                        alt={wishedProduct?.name}
                        className="w-full"
                        width={1000}
                        height={1000}
                    />
                </div>

                <div className="w-1/3">
                    <h2 className="text-gray-800 text-xl font-medium uppercase">
                        {wishedProduct?.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {dictionary?.availability}:

                        {wishedProduct?.availableCount > 0 ?
                            <span className="text-green-600">
                                In Stock
                            </span>
                            :
                            <span className="text-red-600">
                                Out of Stock
                            </span>
                        }
                    </p>
                </div>

                <div className="text-primary text-lg font-semibold">
                    <p>
                        ${calculateNewPrice(wishedProduct?.price, wishedProduct?.discountPercent)}
                    </p>
                </div>

                <div
                    onClick={() => addToCart()}
                    className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium cursor-pointer">
                    {dictionary?.addToCart}
                </div>


                <DeleteSingleWishItem
                    wishedProduct={wishedProduct}
                />

            </div>
        </>
    )
}

export default SingleWishEdProduct
