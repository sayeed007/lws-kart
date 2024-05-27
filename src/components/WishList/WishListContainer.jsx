"use client"

import { useAuth } from '@/hooks/useAuth';
import SingleWishEdProduct from './SingleWishEdProduct';

import NoProductFound from '../../../public/assets/images/NoProductFound.png';
import Image from 'next/image';

const WishListContainer = ({ dictionary }) => {

    const { auth } = useAuth();

    return (
        <>
            {(auth?.wishlistItems?.length > 0) ?
                auth?.wishlistItems?.map((wishedProduct) => {
                    return (
                        <SingleWishEdProduct
                            dictionary={dictionary}
                            key={wishedProduct?.id}
                            wishedProduct={wishedProduct}
                        />
                    )
                })
                :
                <div className='flex w-full justify-center items-center'>
                    <Image
                        src={NoProductFound}
                        alt="No_Product_Found"
                    // height={500}
                    // width={300}
                    />
                </div>
            }
        </>
    )
}

export default WishListContainer
