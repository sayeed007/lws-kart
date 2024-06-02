import { getAllCategories } from '@/database/queries';
import Link from 'next/link';
import CategoryInfo from './CategoryInfo';
import LogInDetails from './LogInDetails';
import NavText from './NavText';

const SecondaryNavbar = async ({ lang, dictionary }) => {

    const allCategory = await getAllCategories();

    const websiteURL = process.env.WEBSITE_URL;

    return (
        <>
            {/* navbar */}
            <nav className="bg-gray-800">
                <div className="container flex">

                    {/* Categories Dropdown */}
                    <CategoryInfo
                        lang={lang}
                        dictionary={dictionary}
                        allCategory={allCategory}
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

                        <LogInDetails
                            lang={lang}
                            dictionary={dictionary}
                            websiteURL={websiteURL}
                        />



                    </div>
                </div>
            </nav>
            {/* navbar */}
        </>
    )
}

export default SecondaryNavbar
