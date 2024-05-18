/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { getDictionary } from '../../../../public/dictionary/dictionaries';
import Link from 'next/link';

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

                    <form action="#" method="post" autocomplete="off">

                        <div className="space-y-2">

                            {/* First Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="text-gray-600 mb-2 block"
                                >
                                    {dictionary?.firstName}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="fulan"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="text-gray-600 mb-2 block"
                                >
                                    {dictionary?.lastName}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="fulana"
                                />
                            </div>

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

                            {/* CONFIRM PASSWORD */}
                            <div>
                                <label
                                    htmlFor="confirm"
                                    className="text-gray-600 mb-2 block">
                                    {dictionary?.confirmPassword}
                                </label>
                                <input
                                    type="password"
                                    name="confirm"
                                    id="confirm"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="*******"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="aggrement"
                                    id="aggrement"
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                />
                                <label
                                    htmlFor="aggrement"
                                    className="text-gray-600 ml-3 cursor-pointer">
                                    {dictionary?.iAgree}
                                    <Link
                                        href="#"
                                        className="text-primary mx-1">
                                        {dictionary?.termsAndCondition}
                                    </Link>
                                </label>
                            </div>
                        </div>


                        <div className="mt-4">
                            <button type="submit"
                                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                                {dictionary?.createAccount}
                            </button>
                        </div>

                    </form>

                    {/*  login with  */}
                    <div className="mt-6 flex justify-center relative">
                        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
                            {dictionary?.orSignUp}
                        </div>
                        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                    </div>

                    <div className="mt-4 flex gap-4">

                        <Link href="#"
                            className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">
                            facebook
                        </Link>

                        <Link href="#"
                            className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">
                            google
                        </Link>
                    </div>

                    {/* login with */}

                    <p className="mt-4 text-center text-gray-600">
                        {dictionary?.alreadyHaveAccount}

                        <Link href="login.html"
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
