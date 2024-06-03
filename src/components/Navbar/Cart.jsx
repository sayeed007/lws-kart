"use client"


import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

const Cart = ({ lang, dictionary }) => {

    const { modifiedAuth } = useModifiedAuth();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            <div
                onClick={() => {
                    if (modifiedAuth?.sessionInfo?.user?.id) {
                        router.push(`/${lang}/cart`);
                    } else {
                        Cookies.set('lastAction', JSON.stringify({
                            lastRoute: pathname,
                            action: 'cartVisit',
                            productId: '',
                            productCount: 0,
                            lang: lang
                        }));
                        router.push(`/${lang}/login`);
                    }
                }}
                // href={modifiedAuth ? `/${lang}/cart` : `/${lang}/login`}
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
            </div>
        </>
    )
}

export default Cart
