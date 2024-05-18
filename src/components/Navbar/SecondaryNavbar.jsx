import Link from 'next/link';
import CategoryInfo from './CategoryInfo';
import NavText from './NavText';

const SecondaryNavbar = ({ dictionary, lang }) => {



    return (
        <>
            {/* navbar */}
            <nav className="bg-gray-800">
                <div className="container flex">

                    {/* Categories Dropdown */}
                    <CategoryInfo
                        dictionary={dictionary}
                    />

                    {/* Secondary Navbar */}
                    <div className="flex items-center justify-between flex-grow md:pl-12 py-5">

                        <div className="flex items-center space-x-6 capitalize">

                            <Link
                                href={`/${lang}`}
                                className={`hover:text-white transition`}
                            >
                                <NavText
                                    text={dictionary?.home}
                                />
                            </Link>

                            <Link
                                href={`/${lang}/shop`}
                                className={`hover:text-white transition`}
                            >
                                <NavText
                                    text={dictionary?.shop}
                                />
                            </Link>

                            <Link
                                href={`/${lang}/about_us`}
                                className={`hover:text-white transition`}
                            >
                                <NavText
                                    text={dictionary?.about_Us}
                                />
                            </Link>

                            <Link
                                href={`/${lang}/contact_us`}
                                className={`hover:text-white transition`}
                            >
                                <NavText
                                    text={dictionary?.contact_us}
                                />
                            </Link>

                        </div>

                        <Link
                            href={`${lang}/login`}
                            className={`text-gray-200 hover:text-white transition`}>
                            {dictionary?.log_in}
                        </Link>

                    </div>
                </div>
            </nav>
            {/* navbar */}
        </>
    )
}

export default SecondaryNavbar
