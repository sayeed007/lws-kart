

import Link from "next/link";
import LWSLogo from '../../../public/assets/images/logo.svg';
import LanguageSwitcher from "../LanguageSwitch/LanguageSwitcher";
import FilterByText from "../ShopSidebar/FilterByText";
import AccountInfo from "./AccountInfo";
import Cart from "./Cart";
import WishList from "./WishList";


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

                    {/* SEARCH FUNCTIONALITY */}
                    <FilterByText
                        dictionary={dictionary}
                        lang={lang}
                    />


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