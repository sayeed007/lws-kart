"use client"

import { useModifiedAuth } from '@/hooks/useModifiedAuth';

import Image from 'next/image';
import NoProductFound from '../../../public/assets/images/NoProductFound.png';
import SingleCartProduct from './SingleCartProduct';

const CartContainer = ({ dictionary }) => {

    const { modifiedAuth } = useModifiedAuth();

    return (
        <>
            {(modifiedAuth?.cartItems?.length > 0) ?
                modifiedAuth?.cartItems?.map((cartProduct) => {
                    return (
                        <SingleCartProduct
                            dictionary={dictionary}
                            key={cartProduct?.id}
                            cartProduct={cartProduct}
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

export default CartContainer
