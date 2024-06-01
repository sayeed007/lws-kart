"use client"

import Link from 'next/link';
import * as Yup from 'yup';
import ErrorTooltip from '../Common/utilities/ErrorToltip';
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { login } from '@/app/actions';
import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormData = {
    email: '',
    password: '',
};


const LogInForm = ({ lang, dictionary }) => {

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const router = useRouter();


    const { handleSubmit, handleChange, values, touched, errors, handleBlur, setValues, resetForm, setErrors, handleReset, isSubmitting } = useFormik({
        initialValues: { ...initialFormData },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: values => {
            // Handle form submission here

            submitResolver(values);
        },
    });

    const submitResolver = async (formData) => {

        try {

            const response = await login(formData);

            // if (response.error) {

            //     toast.error(response.error);

            // } else {

            //     Cookies.set('auth', JSON.stringify(response));
            //     setModifiedAuth(response);

            //     router.push(`/${lang}`);
            // }

        } catch (error) {
        }


    };

    return (
        <>



            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit()
                }}
                autoComplete="true"
            >
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
                            value={values?.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            style={{ border: (touched?.email && errors?.email) ? '2px solid red' : '' }}
                            placeholder="Ex: youremail.@domain.com"
                        />
                        {(touched?.email && errors?.email) && (
                            <span
                                className="float-right mr-2 -mt-8 relative z-50 text-red-500"
                            >
                                <ErrorTooltip
                                    content={errors?.email}
                                    origin={'registration-email'}
                                    placement="right"
                                />
                            </span>
                        )}
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
                            value={values?.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            style={{ border: (touched?.password && errors?.password) ? '2px solid red' : '' }}
                            placeholder="Ex: *******"
                        />
                        {(touched?.password && errors?.password) && (
                            <span
                                className="float-right mr-2 -mt-8 relative z-50 text-red-500"
                            >
                                <ErrorTooltip
                                    content={errors?.password}
                                    origin={'registration-password'}
                                    placement="right"
                                />
                            </span>
                        )}
                    </div>

                </div>

                <div className="flex items-center justify-between mt-6">

                    {/* <div className="flex items-center">
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
                    </div> */}

                    {/* <Link
                        // href="#"
                        className="text-primary">
                        {dictionary?.forgotPassword}
                    </Link> */}

                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                        {dictionary?.log_in}
                    </button>
                </div>

            </form>

        </>
    )
}

export default LogInForm
