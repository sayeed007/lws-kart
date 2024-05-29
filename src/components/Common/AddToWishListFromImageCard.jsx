"use client"



import { useModifiedAuth } from '@/hooks/useModifiedAuth'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'

const AddToWishListFromImageCard = ({ productId }) => {

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

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
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            {/* {success && <p style={{ color: 'green' }}>Product added to wishlist successfully</p>} */}
            <div
                onClick={() => addToWishlist()}
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                title="add to wishlist">
                <FontAwesomeIcon
                    icon={faHeart}
                    width={16}
                    height={16}
                    color={'#FD3D57'}
                />
            </div>
        </>
    )
}

export default AddToWishListFromImageCard
