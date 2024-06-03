import Link from 'next/link';
import NoItem from '../../public/assets/icons/NoItem.svg';
import { getDictionary } from '../../public/dictionary/dictionaries';

export const metadata = {
    title: "LWS-kart | Learn with Sumit",
    description: "Best Collection For Home Decoration",
};

const NotFound = async (props) => {
    const lang = 'en';
    const dictionary = await getDictionary(lang);


    return (

        <>
            <div
                // className='w-full h-screen flex flex-col items-center  justify-center my-4'
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <NoItem
                    // className="w-12 h-12"
                    alt="not-found"
                />

                <div className='font-semibold text-2xl my-2 text-black'>
                    {props?.message ?? "The page You are looking for is not available."}
                </div>

                <Link
                    href={`/${lang}`}
                // className='my-4 text-black'

                >
                    Home Page
                </Link>

            </div>
        </>

    );
}

export default NotFound;
