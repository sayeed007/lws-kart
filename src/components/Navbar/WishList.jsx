import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const WishList = ({ dictionary }) => {
    return (
        <>
            <Link href="#"
                className="flex justify-center items-center text-center text-gray-700 hover:text-primary transition relative mx-3">

                <div className="text-2xl">
                    <FontAwesomeIcon
                        icon={faHeart}
                        width={16}
                        height={16}
                        color={'#FD3D57'}
                    />
                </div>

                <div className="text-md mx-1 leading-3">
                    {dictionary?.wishlist}
                </div>

                <div
                    className="absolute right-[-12px] top-[-10px] w-4 h-4 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                    8
                </div>
            </Link>
        </>
    )
}

export default WishList
