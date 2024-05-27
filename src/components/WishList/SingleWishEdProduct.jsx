import { calculateNewPrice } from '@/utils/data-util'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import DeleteSingleWishItem from './DeleteSingleWishItem'

const SingleWishEdProduct = ({ dictionary, wishedProduct }) => {


    return (
        <>
            <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">

                <div className="w-28">
                    <Image
                        src={wishedProduct?.images?.[0]}
                        alt={wishedProduct?.name}
                        className="w-full"
                        width={1000}
                        height={1000}
                    />
                </div>

                <div className="w-1/3">
                    <h2 className="text-gray-800 text-xl font-medium uppercase">
                        {wishedProduct?.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {dictionary?.availability}:

                        {wishedProduct?.availableCount > 0 ?
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
                        ${calculateNewPrice(wishedProduct?.price, wishedProduct?.discountPercent)}
                    </p>
                </div>

                <Link href="#"
                    className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                    {dictionary?.addToCart}
                </Link>


                <DeleteSingleWishItem
                    wishedProduct={wishedProduct}
                />

            </div>
        </>
    )
}

export default SingleWishEdProduct
