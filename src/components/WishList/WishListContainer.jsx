"use client"

import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import SingleWishEdProduct from './SingleWishEdProduct';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import EmptyBox from '../../../public/assets/images/EmptyBox.jpeg';
import { toast } from 'react-toastify';

const WishListContainer = ({ dictionary, lang }) => {
    const router = useRouter();

    const { modifiedAuth } = useModifiedAuth();

    const userId = modifiedAuth?.id ? modifiedAuth.id : modifiedAuth?.sessionInfo?.user?.id;

    if (!userId) {
        toast.info('You need to login to see your cart list, redirecting you to log in.', {
            onClose: () => {
                router.replace(`/${lang}/login`);
                countRef.current = 'redirected';
            }
        });
    };

    return (
        <>
            {(modifiedAuth?.wishlistItems?.length > 0) ?
                modifiedAuth?.wishlistItems?.map((wishedProduct) => {
                    return (
                        <SingleWishEdProduct
                            dictionary={dictionary}
                            key={wishedProduct?.id}
                            wishedProduct={wishedProduct}
                        />
                    )
                })
                :
                <div className="flex flex-col w-full justify-center items-center">
                    <Image
                        src={EmptyBox}
                        alt={'No Ongoing Order'}
                        width={300}
                        height={150}
                    />
                    <div className="text-xl my-3 font-bold">
                        {dictionary?.noItemInWishList}
                    </div>
                </div>
            }
        </>
    )
}

export default WishListContainer
