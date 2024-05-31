"use client"

import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import ErrorTooltip from '../Common/utilities/ErrorToltip';
import { useState } from 'react';

// const initialFormData = {
//     name: '',
//     email: '',
//     mobile: '',
//     username: '',
//     password: '',
//     gender: '',
//     photo: '',
//     agreement: false,
// };

const initialFormData = {
    name: 'Bappy',
    email: 'bappy@gmail.com',
    mobile: '01701013315',
    username: 'SHB',
    password: '123456',
    gender: 'Male',
    photo: 'http://ptoto.com',
    agreement: true,
};

const RegistrationForm = ({ lang, dictionary }) => {
    const router = useRouter();


    const { handleSubmit, handleChange, values, touched, errors, handleBlur, setValues, resetForm, setErrors, handleReset, isSubmitting } = useFormik({
        initialValues: { ...initialFormData },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            mobile: Yup.string().required('Mobile number is required'),
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
            gender: Yup.string().required('Gender is required'),
            photo: Yup.string().url('Invalid URL').required('Image url is required'),
            agreement: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
        }),
        onSubmit: values => {
            // Handle form submission here
            submitResolver(values);
        },
    });

    const submitResolver = async (formData) => {

        try {

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData }),
            });

            if (res.status === 201) {
                router.push(`/${lang}/login`);
            };

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

                    {/* User Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="text-gray-600 mb-2 block"
                        >
                            {dictionary?.name}
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={values?.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            style={{ border: (touched?.name && errors?.name) ? '2px solid red' : '' }}
                            placeholder="Ex: yourName"
                        />
                        {(touched?.name && errors?.name) && (
                            <span
                                className="float-right mr-2 -mt-8 relative z-50 text-red-500"
                            >
                                <ErrorTooltip
                                    content={errors?.name}
                                    origin={'registration-name'}
                                    placement="right"
                                />
                            </span>
                        )}
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

                    {/* MOBILE */}
                    <div>
                        <label
                            htmlFor="mobile"
                            className="text-gray-600 mb-2 block">
                            {dictionary?.mobile}
                        </label>

                        <input
                            type="number"
                            name="mobile"
                            id="mobile"
                            value={values?.mobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            style={{ border: (touched?.mobile && errors?.mobile) ? '2px solid red' : '' }}
                            placeholder="Ex: 01701234567"
                        />
                        {(touched?.mobile && errors?.mobile) && (
                            <span
                                className="float-right mr-2 -mt-8 relative z-50 text-red-500"
                            >
                                <ErrorTooltip
                                    content={errors?.mobile}
                                    origin={'registration-mobile'}
                                    placement="right"
                                />
                            </span>
                        )}
                    </div>

                    {/* UserName */}
                    <div>
                        <label
                            htmlFor="username"
                            className="text-gray-600 mb-2 block">
                            {dictionary?.username}
                        </label>

                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={values?.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            style={{ border: (touched?.username && errors?.username) ? '2px solid red' : '' }}
                            placeholder="Ex: YName"
                        />
                        {(touched?.username && errors?.username) && (
                            <span
                                className="float-right mr-2 -mt-8 relative z-50 text-red-500"
                            >
                                <ErrorTooltip
                                    content={errors?.username}
                                    origin={'registration-userName'}
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

                    {/* CONFIRM PASSWORD */}
                    {/* <div>
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
                                    placeholder="Ex: *******"
                                />
                            </div> */}

                    {/* GENDER */}
                    <div>
                        <label
                            htmlFor="GenderOption"
                            className="text-gray-600 mb-2 block">
                            {dictionary?.gender}
                        </label>

                        {/* Male */}
                        <div className='flex items-center mb-2'>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                id="male"

                                checked={values?.gender === 'Male'}
                                onChange={(e) => {
                                    setValues({
                                        ...values,
                                        gender: e?.target?.value
                                    })
                                }}
                            />
                            <label
                                htmlFor="male"
                                className="text-gray-600 block mx-2">
                                {dictionary?.male}
                            </label>
                        </div>

                        {/* Female */}
                        <div className='flex items-center mb-2'>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                id="female"

                                checked={values?.gender === 'Female'}
                                onChange={(e) => {
                                    setValues({
                                        ...values,
                                        gender: e?.target?.value
                                    })
                                }}
                            />
                            <label
                                htmlFor="female"
                                className="text-gray-600 block mx-2">
                                {dictionary?.female}
                            </label>
                        </div>

                        {/* Other */}
                        <div className='flex items-center mb-2'>
                            <input
                                type="radio"
                                name="gender"
                                value="Other"
                                id="other"

                                checked={values?.gender === 'Other'}
                                onChange={(e) => {
                                    setValues({
                                        ...values,
                                        gender: e?.target?.value
                                    })
                                }}
                            />
                            <label
                                htmlFor="other"
                                className="text-gray-600 block mx-2">
                                {dictionary?.other}
                            </label>
                        </div>

                        {(touched?.gender && errors?.gender) && (
                            <span
                                className="float-right mr-2 -mt-8 relative z-50 text-red-500"
                            >
                                <ErrorTooltip
                                    content={errors?.gender}
                                    origin={'registration-gender'}
                                    placement="right"
                                />
                            </span>
                        )}
                    </div>


                    {/* PHOTO URL */}
                    <div>
                        <label
                            htmlFor="password"
                            className="text-gray-600 mb-2 block">
                            {dictionary?.photo}
                        </label>
                        <input
                            type="text"
                            name="photo"
                            id="photo"
                            value={values?.photo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            style={{ border: (touched?.photo && errors?.photo) ? '2px solid red' : '' }}
                            placeholder="Ex: https://photos.google.com"
                        />
                        {(touched?.photo && errors?.photo) && (
                            <span
                                className="float-right mr-2 -mt-8 relative z-50 text-red-500"
                            >
                                <ErrorTooltip
                                    content={errors?.photo}
                                    origin={'registration-photo'}
                                    placement="right"
                                />
                            </span>
                        )}
                    </div>


                </div>

                <div className="mt-6">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="agreement"
                            id="agreement"
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer"

                            checked={values?.agreement}
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    agreement: e?.target?.checked
                                })
                            }}
                        />
                        <label
                            htmlFor="agreement"
                            className="text-gray-600 ml-3 cursor-pointer">
                            {dictionary?.iAgree}
                            <Link
                                href={`/${lang}/termsAndCondition`}
                                className="text-primary mx-1">
                                {dictionary?.termsAndCondition}
                            </Link>
                        </label>

                        {(touched?.agreement && errors?.agreement) && (
                            <span
                                className="float-right mr-2s relative z-50 text-red-500"
                            >
                                <ErrorTooltip
                                    content={errors?.agreement}
                                    origin={'registration-agreement'}
                                    placement="right"
                                />
                            </span>
                        )}
                    </div>
                </div>


                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                        {dictionary?.createAccount}
                    </button>
                </div>

            </form>

        </>
    )
}

export default RegistrationForm





