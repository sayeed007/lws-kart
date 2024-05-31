/* eslint-disable react/no-unescaped-entities */
import RegistrationForm from '@/components/Auth/RegistrationForm';
import Link from 'next/link';
import { getDictionary } from '../../../../public/dictionary/dictionaries';
import SocialLogins from '@/components/Auth/SocialLogins';


export async function generateMetadata() {
    return {
        title: "LWS-kart | Learn with Sumit",
        description: "Register into LWS_Kart",
    }
};



const RegisterPage = async ({ params: { lang } }) => {

    const dictionary = await getDictionary(lang);


    return (
        <>

            {/* register */}
            <div className="contain py-8">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">

                    <h2 className="text-2xl uppercase font-medium mb-1">
                        {dictionary?.createAnAccount}
                    </h2>

                    <p className="text-gray-600 mb-6 text-sm">
                        {dictionary?.registerForCustomer}
                    </p>

                    {/* REGISTRATION FORM */}
                    <RegistrationForm
                        lang={lang}
                        dictionary={dictionary}
                    />

                    {/*  login with  */}
                    <div className="mt-6 flex justify-center relative">
                        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
                            {dictionary?.orSignUp}
                        </div>
                        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                    </div>

                    <div className="mt-4 flex justify-center gap-4">

                        <SocialLogins
                            mode={"login"}
                        />
                    </div>

                    {/* login with */}

                    <p className="mt-4 text-center text-gray-600">
                        {dictionary?.alreadyHaveAccount}

                        <Link
                            href={`/${lang}/login`}
                            className="text-primary mx-2">
                            {dictionary?.logInNow}
                        </Link>
                    </p>
                </div>
            </div>
            {/* register */}

        </>
    )
}

export default RegisterPage
