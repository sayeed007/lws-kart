"use client"

import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import SingleWishEdProduct from './SingleWishEdProduct';

import NoProductFound from '../../../public/assets/images/NoProductFound.png';
import Image from 'next/image';

const WishListContainer = ({ dictionary }) => {

    const { modifiedAuth } = useModifiedAuth();

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
