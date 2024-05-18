import Image from "next/image";


import LWSLogo from '../../../public/assets/images/logo.svg';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faHeart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import WishList from "./WishList";
import Cart from "./Cart";
import AccountInfo from "./AccountInfo";
import LanguageSwitcher from "../LanguageSwitch/LanguageSwitcher";



// const SIZES = ["xs", "sm", "lg", "2x", "3x", "5x", "7x", "10x"];

function PrimaryNavbar({ dictionary, lang }) {

    return (
        <>
            {/* header */}
            <header className="py-4 shadow-sm bg-white">
                <div className="container flex items-center justify-between">

                    <div>
                        <Link
                            href={`/${lang}`}
                            className="w-32"
                        >
                            <LWSLogo
                                alt="Logo"
                                width={128}
                                height={42}
                            />
                        </Link>
                    </div>

                    <div className="w-full max-w-xl relative flex">
                        <div className="absolute left-4 top-4 text-lg text-gray-400 hidden md:flex">
                            <FontAwesomeIcon
                                icon={faSearch}
                                width={16}
                                height={16}
                                color={'#FD3D57'}
                            />
                        </div>

                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                            placeholder={dictionary?.type_here}
                        />

                        <button
                            className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent  hover:text-primary transition hidden md:flex md:items-center" >
                            {dictionary?.search}
                        </button>

                    </div>

                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />

                        {/* WISHLIST */}
                        <WishList
                            dictionary={dictionary}
                        />

                        {/* CART */}
                        <Cart
                            dictionary={dictionary}
                        />


                        {/* ACCOUNT INFO */}
                        <AccountInfo
                            lang={lang}
                            dictionary={dictionary}
                        />

                    </div>
                </div>
            </header>
            {/* header */}


        </>
    )
}

export default PrimaryNavbar