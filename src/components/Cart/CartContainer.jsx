"use client"

import { useModifiedAuth } from '@/hooks/useModifiedAuth';

import Image from 'next/image';
import NoProductFound from '../../../public/assets/images/NoProductFound.png';
import SingleCartProduct from './SingleCartProduct';
import Link from 'next/link';

const CartContainer = ({ dictionary, lang }) => {

    const { modifiedAuth } = useModifiedAuth();

    return (
        <>
            {(modifiedAuth?.cartItems?.length > 0) ?
                <>
                    {modifiedAuth?.cartItems?.map((cartProduct) => {
                        return (
                            <SingleCartProduct
                                dictionary={dictionary}
                                key={cartProduct?.id}
                                cartProduct={cartProduct}
                            />
                        )
                    })
                    }

                    <div className='flex justify-center mt-4'>
                        <Link
                            href={`/${lang}/checkout`}
                            className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium cursor-pointer">
                            {dictionary?.checkout}
                        </Link>
                    </div>


                </>
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
