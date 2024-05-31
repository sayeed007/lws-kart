"use client"

import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import SingleWishEdProduct from './SingleWishEdProduct';

import Image from 'next/image';
import EmptyBox from '../../../public/assets/images/EmptyBox.jpeg';

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
