`use client`


import { useAuth } from '@/hooks/useAuth';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';

const DeleteSingleWishItem = ({ wishedProduct }) => {

    const { auth, setAuth } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const removeFromWishlist = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.delete(`/api/auth/wishlist/${wishedProduct?.wishlistData?.id}`, {
                headers: {
                    'Authorization': `Bearer ${auth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                    'Content-Type': 'application/json'
                }
            });
            setLoading(false);
            setSuccess(true);

            if (response?.data) {
                setAuth({
                    ...auth,
                    wishlistItems: [
                        ...auth?.wishlistItems?.filter((wishListItem) => wishListItem?.wishlistData?.id !== wishedProduct?.wishlistData?.id)
                    ]
                });
            } else {

            }

        } catch (error) {
            setLoading(false);
            setError(error || 'Something went wrong');
            console.error('Delete to wishlist error:', error);
        }
    };


    return (
        <>
            <div
                className="flex text-gray-600 cursor-pointer hover:text-primary"
                onClick={() => removeFromWishlist()}
            >
                <FontAwesomeIcon
                    icon={faTrash}
                    width={20}
                    height={20}
                    color={'#FD3D57'}
                />
            </div>
        </>
    )
}

export default DeleteSingleWishItem
