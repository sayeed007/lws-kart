"use client"


import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Cart = ({ lang, dictionary }) => {

    const { modifiedAuth } = useModifiedAuth();

    return (
        <>
            <Link href={modifiedAuth ? `/${lang}/cart` : `/${lang}/login`}
                className="flex justify-center items-center text-center text-gray-700 hover:text-primary transition relative  mx-3"
                title="Cart List"
            >
                <div className="text-2xl">
                    <FontAwesomeIcon
                        icon={faBagShopping}
                        width={24}
                        height={24}
                        color={'#FD3D57'}
                    />
                </div>
                {/* <div className="text-md mx-1 leading-3">
                    {dictionary?.cart}
                </div> */}
                <div
                    className="absolute right-[-12px] top-[-10px] w-4 h-4 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                    {modifiedAuth?.cartItems?.length ? modifiedAuth?.cartItems?.length : 0}
                </div>
            </Link>
        </>
    )
}

export default Cart
