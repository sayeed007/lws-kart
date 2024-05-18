/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { getDictionary } from '../../../../public/dictionary/dictionaries';
import Link from 'next/link';

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

                    <form action="#" method="post" autocomplete="off">
                        <div className="space-y-2">

                            {/* EMAIL */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-gray-600 mb-2 block">
                                    {dictionary?.email}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="youremail.@domain.com"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-gray-600 mb-2 block">
                                    {dictionary?.password}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="*******"
                                />
                            </div>

                        </div>

                        <div className="flex items-center justify-between mt-6">

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-gray-600 ml-3 cursor-pointer">
                                    {dictionary?.rememberMe}
                                </label>
                            </div>

                            <Link
                                href="#"
                                className="text-primary">
                                {dictionary?.forgotPassword}
                            </Link>

                        </div>

                        <div className="mt-4">
                            <button type="submit"
                                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                                {dictionary?.log_in}
                            </button>
                        </div>

                    </form>

                    {/* login with */}
                    <div className="mt-6 flex justify-center relative">
                        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
                            {dictionary?.orLogIn}
                        </div>
                        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                    </div>


                    <div className="mt-4 flex gap-4">
                        <Link
                            href="#"
                            className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">
                            facebook
                        </Link>

                        <Link
                            href="#"
                            className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">
                            google
                        </Link>

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
