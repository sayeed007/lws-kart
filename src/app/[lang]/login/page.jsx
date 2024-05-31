/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { getDictionary } from '../../../../public/dictionary/dictionaries';
import Link from 'next/link';
import SocialLogins from '@/components/Auth/SocialLogins';
import LogInForm from '@/components/Auth/LogInForm';

export async function generateMetadata() {
    return {
        title: "LWS-kart | Learn with Sumit",
        description: "Log into LWS_Kart",
    }
};



const LoginPage = async ({ params: { lang } }) => {

    const dictionary = await getDictionary(lang);


    return (
        <>

            {/* login */}
            <div className="contain py-8">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">

                    <h2 className="text-2xl uppercase font-medium mb-1">
                        {dictionary?.log_in}
                    </h2>

                    <p className="text-gray-600 mb-6 text-sm">
                        {dictionary?.logInWelcome}
                    </p>

                    {/* LOG IN FORM */}
                    <LogInForm
                        lang={lang}
                        dictionary={dictionary}
                    />

                    {/* login with */}
                    <div className="mt-6 flex justify-center relative">
                        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
                            {dictionary?.orLogIn}
                        </div>
                        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                    </div>


                    <div className="mt-4 justify-center flex gap-4">

                        <SocialLogins
                            mode={"login"}
                        />

                    </div>
                    {/* login with */}

                    <p className="mt-4 text-center text-gray-600">
                        {dictionary?.notHaveAccount}
                        <Link
                            href={`/${lang}/register`}
                            className="text-primary mx-2">
                            {dictionary?.registerNow}
                        </Link>
                    </p>
                </div>
            </div>
            {/* ./login */}

        </>
    )
}

export default LoginPage
