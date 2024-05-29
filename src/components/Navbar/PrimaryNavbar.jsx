

import Link from "next/link";
import LWSLogo from '../../../public/assets/images/logo.svg';
import LanguageSwitcher from "../LanguageSwitch/LanguageSwitcher";
import FilterByText from "../ShopSidebar/FilterByText";
import AccountInfo from "./AccountInfo";
import Cart from "./Cart";
import WishList from "./WishList";
import { auth } from "../../../auth";


async function PrimaryNavbar({ dictionary, lang }) {

    const session = await auth();
    // console.log(session);

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
                            lang={lang}
                        />

                        {/* CART */}
                        <Cart
                            dictionary={dictionary}
                            lang={lang}
                        />


                        {/* ACCOUNT INFO */}
                        <AccountInfo
                            lang={lang}
                            dictionary={dictionary}
                            session={session}
                        />

                    </div>
                </div>
            </header>
            {/* header */}


        </>
    )
}

export default PrimaryNavbar