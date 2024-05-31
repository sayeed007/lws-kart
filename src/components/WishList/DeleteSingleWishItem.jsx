`use client`


import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { toast } from 'react-toastify';

const DeleteSingleWishItem = ({ wishedProduct }) => {

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const [loading, setLoading] = useState(false);

    const removeFromWishlist = async () => {
        try {
            setLoading(true);

            const response = await axios.delete(`/api/auth/wishlist/${wishedProduct?.wishlistData?.id}`, {
                headers: {
                    'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                    'Content-Type': 'application/json'
                }
            });
            setLoading(false);


            if (response?.data?.isDeleted) {
                toast.success(response?.data?.message);

                setModifiedAuth({
                    ...modifiedAuth,
                    wishlistItems: [
                        ...modifiedAuth?.wishlistItems?.filter((wishListItem) => wishListItem?.wishlistData?.id !== wishedProduct?.wishlistData?.id)
                    ]
                });

            } else {
                toast.error(response?.data?.message);
            }

        } catch (error) {
            toast.error(`Delete to wishlist error: ${error}`);
            setLoading(false);
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
