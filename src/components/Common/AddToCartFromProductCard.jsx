"use client"


import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddToCartFromProductCard = ({ lang, dictionary, itemInfo }) => {

    const Router = useRouter();

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const [loading, setLoading] = useState(false);


    const addToCart = async () => {

        if (modifiedAuth?.sessionInfo?.user?.id) {
            try {
                setLoading(true);

                const response = await axios.post('/api/auth/cart', {
                    productId: (JSON.parse(itemInfo))?.id,
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

                if (response?.data?.addToCartList) {
                    toast.success(response?.data?.message);

                    setModifiedAuth({
                        ...modifiedAuth,
                        cartItems: response.data?.cartItems
                    });

                } else {
                    toast.error(response?.data?.message);
                }

            } catch (error) {
                setLoading(false);
                toast.error(`Add to cart error: ${error}`);
                console.error('Add to wishlist error:', error);
            }
        } else {
            toast.info("You need to log in to add product in cart, redirecting you to log in.",
                {
                    onClose: () => Router.push(`/${lang}/login`)
                });
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
