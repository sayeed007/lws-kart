"use client"


import { useModifiedAuth } from '@/hooks/useModifiedAuth'
import { faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import IncrementOrDecrement from './utilities/IncrementOrDecrement'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'


const UserActionOnProductDetails = ({ productInfo, dictionary, lang }) => {

    const router = useRouter();
    const pathname = usePathname();


    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const [loading, setLoading] = useState(false);

    const [addToCartValue, setAddToCartValue] = useState(4);

    const addToCart = async () => {
        if (modifiedAuth?.sessionInfo?.user?.id) {
            try {
                setLoading(true);

                const response = await axios.post('/api/auth/cart', {
                    productId: (JSON.parse(productInfo))?.id,
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

                if (response?.data?.addToCartList) {
                    toast.success(response?.data?.message, {
                        onClose: () => { router.refresh() }
                    });

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
                console.error('Add to cart error:', error);
            }
        } else {
            toast.info("You need to log in to add product in cart, redirecting you to log in.",
                {
                    onClose: () => {
                        Cookies.set('lastAction', JSON.stringify({
                            lastRoute: pathname,
                            action: 'addToCart',
                            productId: (JSON.parse(productInfo))?.id,
                            productCount: addToCartValue,
                            lang: lang
                        }));
                        router.push(`/${lang}/login`);
                    }
                });
        }
    };

    const addToWishlist = async () => {
        if (modifiedAuth?.sessionInfo?.user?.id) {
            try {
                setLoading(true);
                const response = await axios.post('/api/auth/wishlist', {
                    productId: (JSON.parse(productInfo))?.id,
                    userId: modifiedAuth?.sessionInfo?.user?.id,
                }, {
                    headers: {
                        'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                        'Content-Type': 'application/json'
                    }
                });
                setLoading(false);

                if (response?.data?.wishedProduct) {
                    setModifiedAuth({
                        ...modifiedAuth,
                        wishlistItems: [...response?.data?.wishedProduct]
                    });

                    toast.success(response?.data?.message);

                } else {
                    toast.warning(response?.data?.message);
                }

            } catch (error) {
                toast.error(`Add to wishlist error: ${error}`);
                setLoading(false);
                console.error('Add to wishlist error:', error);
            }
        } else {
            toast.info("You need to log in to add product in wishlist, redirecting you to log in.",
                {
                    onClose: () => {
                        Cookies.set('lastAction', JSON.stringify({
                            lastRoute: pathname,
                            action: 'addToWishlist',
                            productId: (JSON.parse(productInfo))?.id,
                            productCount: 1,
                            lang: lang
                        }));
                        router.push(`/${lang}/login`);
                    }
                });
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

                <div
                    onClick={() => addToCart()}
                    className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition cursor-pointer">
                    <FontAwesomeIcon
                        icon={faShoppingBag}
                        width={24}
                        height={24}
                        color={'white'}
                    />
                    {dictionary?.addToCart}
                </div>


                <div
                    onClick={() => addToWishlist()}
                    className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition cursor-pointer">
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
