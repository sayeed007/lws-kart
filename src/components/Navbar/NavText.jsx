'use client'
import { usePathname } from 'next/navigation';



const secondaryNavDictionary = {
    // "home": "হোম",
    // "shop": "দোকান",
    // "about_Us": "আমাদের সম্পর্কে",
    // "contact_us": "যোগাযোগ করুন",
    "হোম": "home",
    "দোকান": "shop",
    "আমাদের সম্পর্কে": "about_Us",
    "যোগাযোগ করুন": "contact_us",

}

const NavText = ({ text }) => {

    const pathname = usePathname();

    const onlyEngLishConvertedText = secondaryNavDictionary?.[text] ? secondaryNavDictionary?.[text] : text;

    // console.log(pathname);
    // console.log(text)
    // console.log((pathname.includes(text.toLowerCase()) || ((text === 'Home' || text === 'হোম') && pathname?.split('/')?.length === 2)))


    console.log(onlyEngLishConvertedText);

    return (
        <span
            className={`text-lg font-medium 
            ${pathname && (pathname.includes(onlyEngLishConvertedText.toLowerCase()) || ((onlyEngLishConvertedText === 'home') && pathname?.split('/')?.length === 2))
                    ? 'text-primary font-semibold text-xl'
                    : 'text-gray-200'}`}
        >
            {text}
        </span>
    )
}

export default NavText
