`use client`


import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const DeleteSingleCartItem = ({ cartProduct, refetchData, setRefetchData }) => {

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const [loading, setLoading] = useState(false);

    const removeFromWishlist = async () => {
        try {
            setLoading(true);

            const response = await axios.delete(`/api/auth/cart/${cartProduct?.cartData?.id}`, {
                headers: {
                    'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                    'Content-Type': 'application/json'
                }
            });
            setLoading(false);

            if (response?.data?.isDeleted) {
                toast.success(response?.data?.message);

                setRefetchData(!refetchData);
            } else {
                toast.error(response?.data?.message);
            }

        } catch (error) {
            setLoading(false);
            toast.error(`Delete to cart error: ${error}`);
            console.error('Delete to cart error:', error);
        }
    };


    return (
        <>
            <div
                className="flex text-gray-600 cursor-pointer hover:text-primary"
                onClick={() => removeFromWishlist()}
                title={'Delete from cart'}
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

export default DeleteSingleCartItem
