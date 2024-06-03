"use client"



import { useModifiedAuth } from '@/hooks/useModifiedAuth'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { usePathname } from 'next/navigation'

const AddToWishListFromImageCard = ({ lang, productId }) => {

    const router = useRouter();
    const pathname = usePathname();

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const [loading, setLoading] = useState(false);

    const addToWishlist = async () => {

        if (modifiedAuth?.sessionInfo?.user?.id) {
            try {
                setLoading(true);
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
                            productId: productId,
                            productCount: 1,
                            lang: lang
                        }));
                        router.push(`/${lang}/login`)
                    },
                    autoClose: 1000
                }
            );
        }
    };

    return (
        <>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <div
                onClick={() => addToWishlist()}
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition cursor-pointer"
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
