import { calculateNewPrice } from '@/utils/data-util'
import Image from 'next/image'
import DeleteSingleCartItem from './DeleteSingleCartItem'

const SingleCartProduct = ({ dictionary, cartProduct }) => {

    console.log(cartProduct);


    return (
        <>
            <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">

                <div className="w-28">
                    <Image
                        src={cartProduct?.images?.[0]}
                        alt={cartProduct?.name}
                        className="w-full"
                        width={1000}
                        height={1000}
                    />
                </div>

                <div className="w-1/3">
                    <h2 className="text-gray-800 text-xl font-medium uppercase">
                        {cartProduct?.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {dictionary?.availability}:

                        {cartProduct?.availableCount > 0 ?
                            <span className="text-green-600">
                                In Stock
                            </span>
                            :
                            <span className="text-red-600">
                                Out of Stock
                            </span>
                        }
                    </p>
                </div>

                <div className="text-primary text-lg font-semibold">
                    <p>
                        ${calculateNewPrice(cartProduct?.price, cartProduct?.discountPercent)}
                    </p>
                </div>

                <div className="text-gray-800 text-lg font-semibold">
                    <p>
                        {cartProduct?.cartData?.productCount}
                    </p>
                </div>


                <DeleteSingleCartItem
                    cartProduct={cartProduct}
                />

            </div>
        </>
    )
}

export default SingleCartProduct
