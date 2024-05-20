

import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import Link from 'next/link';
import Product1 from '../../../public/assets/images/products/product1.jpg';
import Product2 from '../../../public/assets/images/products/product2.jpg';
import Product3 from '../../../public/assets/images/products/product3.jpg';
import Product4 from '../../../public/assets/images/products/product4.jpg';
import StarRating from '../Rating/StarRating';
import { calculateNewPrice } from '@/utils/data-util';


const nameWiseImageMap = {
    'Product1': Product1,
    'Product2': Product2,
    'Product3': Product3,
    'Product4': Product4,
};


const SingleProductCard = (props) => {

    return (
        <>
            <div className="bg-white shadow rounded overflow-hidden group">

                <div className="relative">

                    <Image
                        src={props?.eachNewItem?.images?.[0]}
                        alt="product 1"
                        className="w-full"
                        width={1000}
                        height={1000}
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition">

                        {/* GO TO product Details */}
                        <Link
                            href={`/${props?.lang}/product/${props?.eachNewItem?.id}`}
                            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                            title="view product">
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                width={16}
                                height={16}
                                color={'#FD3D57'}
                            />
                        </Link>


                        {/* ADD TO WISHED LIST */}
                        <Link
                            href="#"
                            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                            title="add to wishlist">
                            <FontAwesomeIcon
                                icon={faHeart}
                                width={16}
                                height={16}
                                color={'#FD3D57'}
                            />
                        </Link>

                    </div>

                </div>

                <div className="pt-4 pb-3 px-4">
                    <Link
                        href={`/${props?.lang}/product/${props?.eachNewItem?.id}`}
                    >
                        <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                            {props?.eachNewItem?.name}
                        </h4>
                    </Link>

                    <div className="flex items-baseline mb-1 space-x-2">
                        {props?.eachNewItem?.discountAvailable ?
                            <>
                                <p className="text-xl text-primary font-semibold">
                                    ${calculateNewPrice(props?.eachNewItem?.price, props?.eachNewItem?.discountPercent)}
                                </p>
                                <p className="text-sm text-gray-400 line-through">
                                    ${props?.eachNewItem?.price}
                                </p>
                            </>
                            :
                            <p className="text-xl text-primary font-semibold">
                                ${props?.eachNewItem?.price}
                            </p>
                        }

                    </div>

                    <div className="flex items-center">

                        <div className="flex gap-1 text-sm text-yellow-400">
                            <StarRating
                                originalRating={props?.eachNewItem?.averageRating}
                                ratingRange={5}
                            />
                        </div>

                        <div className="text-xs text-gray-500 ml-3">
                            ({props?.eachNewItem?.reviewCount})
                        </div>
                    </div>

                </div>

                {/* ADD TO CART FUNCTIONALITY */}
                <Link href="#"
                    className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
                    {props?.dictionary?.addToCart}
                </Link>
            </div>
        </>
    )
}

export default SingleProductCard
