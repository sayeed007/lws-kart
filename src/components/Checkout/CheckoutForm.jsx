"use client"


import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import ErrorTooltip from '../Common/utilities/ErrorToltip';
import Modal from '../Common/utilities/Modal';
import Link from 'next/link';
import { calculateNewPrice } from '@/utils/data-util';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const initialFormData = {
    shippingAddress: {
        division: '',
        district: '',
        thana: '',
        postOffice: '',
        village: '',
        road: '',
        house: '',
        mobile: '',
        note: ''
    },
    billingAddress: {
        division: '',
        district: '',
        thana: '',
        postOffice: '',
        village: '',
        road: '',
        house: '',
        mobile: '',
        note: ''
    },
    userId: '',
    agreeTerms: false,

};

const addressAttributes = [
    {
        name: "division",
        required: true,
        type: "text"
    },
    {
        name: "district",
        required: true,
        type: "text"
    },
    {
        name: "thana",
        required: true,
        type: "text"
    },
    {
        name: "postOffice",
        required: true,
        type: "text"
    },
    {
        name: "village",
        required: true,
        type: "text"
    },
    {
        name: "road",
        required: false,
        type: "text"
    },
    {
        name: "house",
        required: true,
        type: "text"
    },
    {
        name: "mobile",
        required: true,
        type: "number"
    },
    {
        name: "note",
        required: false,
        type: "text"
    },
];


const CheckoutForm = ({ dictionary, lang, previousData }) => {

    const router = useRouter();

    const { modifiedAuth, setModifiedAuth } = useModifiedAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const { handleSubmit, handleChange, values, touched, errors, handleBlur, setValues, resetForm, setErrors, handleReset, isSubmitting } = useFormik({
        initialValues: { ...initialFormData },
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            billingAddress: Yup.object().shape({
                division: Yup.string().required('Division is required'),
                district: Yup.string().required('District is required'),
                thana: Yup.string().required('Thana is required'),
                postOffice: Yup.string().required('Post office is required'),
                village: Yup.string().required('Village is required'),
                road: Yup.string(),
                house: Yup.string().required('House is required'),
                mobile: Yup.string().required('Mobile is required'),
                note: Yup.string()
            }),
            shippingAddress: Yup.object().shape({
                division: Yup.string().required('Division is required'),
                district: Yup.string().required('District is required'),
                thana: Yup.string().required('Thana is required'),
                postOffice: Yup.string().required('Post office is required'),
                village: Yup.string().required('Village is required'),
                road: Yup.string(),
                house: Yup.string().required('House is required'),
                mobile: Yup.string().required('Mobile is required'),
                note: Yup.string()
            }),
            userId: Yup.string(),
            // .required('User ID is required')
            agreeTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
        }),

        onSubmit: (values) => {

            // NEED TO SUBMIT DATA IN THREE TABLE

            // STEP - 1 Order Details
            // {
            //     productId: 6649814c3ad3d3f4adb8906f,
            //     userId: 612345678901234567890124,
            //     price: 18500,
            //     count: 1,
            //     orderTime: 1716104367562,
            //     discount: 20,
            //     status: "Delivered"
            // }

            // STEP - 2 PRODUCT ORDERS
            // {
            //     productId: 6649814c3ad3d3f4adb8906e,
            //     orderId: 612345678901234567890123,
            //     orderDate: 1613969925000
            // }

            // STEP - 3 User Order
            // {
            //     orderDetailsId: ["612345678901234567890123", "612345678901234567890124"],
            //     userId: "612345678901234567890123",
            //     status: "Pending",
            //     totalPrice: 100.50,
            //     orderTime: new Date(),
            //     invoiceImage: "https://example.com/invoice123.jpg"
            // }


            submitResolver(values);
        }
    });

    useEffect(() => {
        const fetchUserAddressData = async () => {
            try {

                const response = await axios.get(`/api/auth/userAddress/${modifiedAuth?.sessionInfo?.user?.id}`);

                // Handle response.data as needed
                setValues(response?.data?.userId ?
                    { ...response?.data, agreeTerms: false }
                    :
                    { ...initialFormData, userId: modifiedAuth?.sessionInfo?.user?.id }
                );


            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        if (modifiedAuth?.sessionInfo?.user?.id) {
            // debugger
            // if (modifiedAuth?.cartItems?.length && modifiedAuth?.cartItems?.length > 0) {
            //     router.push(`/${lang}`);
            // };

            fetchUserAddressData();
        };


    }, [modifiedAuth]);


    const submitResolver = async (value) => {
        try {
            setLoading(true);
            setError(null);

            // EDIT MODE
            const response = await axios.post(`/api/auth/placeOrder`,
                {
                    userAddress: value,
                    userOrderList: modifiedAuth?.cartItems
                },
                {
                    headers: {
                        'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                        'Content-Type': 'application/json'
                    }
                });


            setLoading(false);
            setSuccess(true);

            if (response?.data) {
                setModifiedAuth({
                    ...modifiedAuth,
                    cartItems: []
                });

                Cookies.set('auth', JSON.stringify({
                    ...modifiedAuth,
                    cartItems: []
                }));

                router.push(`/${lang}/account/${value?.userId}`);
            }


        } catch (error) {
            setLoading(false);
            setError(error || 'Something went wrong');
            console.error('Add New Address error:', error);
        }
    };


    const calculateSubtotal = () => {
        // Calculate total sum with discount
        const totalSumWithDiscount = modifiedAuth?.cartItems.reduce((total, item) => {

            // Calculate discounted price
            const discountedPrice = item?.price - (item?.price * (item?.discountPercent / 100));
            // Multiply discounted price by productCount and add to total
            return total + (discountedPrice * item?.cartData?.productCount);
        }, 0);

        return totalSumWithDiscount;

    };


    // console.log(values);

    return (
        <>




            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit()
                }}
                autoComplete="true">



                <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">

                    {/* CHECKOUT ADDRESS */}
                    <div className="col-span-8 border border-gray-200 p-4 rounded">

                        <h3 className="text-lg font-bold capitalize mb-4">
                            {dictionary?.checkout}
                        </h3>

                        <div className="space-y-4">
                            <div
                                className='flex justify-between'
                            >

                                {/* BILLING ADDRESS */}
                                <div className="w-[48%]">

                                    <h3 className="text-lg font-medium capitalize mb-4">
                                        {dictionary?.shippingAddress}
                                    </h3>

                                    {addressAttributes?.map((attribute) => {
                                        return (
                                            <div
                                                key={attribute?.name}
                                                className='py-2'
                                            >
                                                <label
                                                    htmlFor={`billingAddress.${attribute?.name}`}
                                                    className={`text-gray-600 mb-2 block capitalize ${attribute?.required ? 'required' : ''}`}>
                                                    {dictionary?.[attribute?.name]}
                                                </label>
                                                <input
                                                    name={`billingAddress.${attribute?.name}`}
                                                    id={`billingAddress.${attribute?.name}`}
                                                    type={attribute?.type}
                                                    value={values?.['billingAddress']?.[attribute?.name]}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"

                                                    style={{ border: (touched?.['billingAddress']?.[attribute?.name] && errors?.['billingAddress']?.[attribute?.name]) ? '2px solid red' : '' }}

                                                    placeholder={`Ex: ${attribute?.name}`}
                                                />

                                                {(touched?.['billingAddress']?.[attribute?.name] && errors?.['billingAddress']?.[attribute?.name]) && (
                                                    <span
                                                        className="float-right mr-2 -mt-8 relative z-50 text-red-500"
                                                    >
                                                        <ErrorTooltip
                                                            content={errors?.['billingAddress']?.[attribute?.name]}
                                                            placement="right"
                                                            origin={`billingAddress-${attribute?.name}`}
                                                        />
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    })
                                    }
                                </div>

                                {/* SHIPPING ADDRESS */}

                                <div className="w-[48%]">

                                    <h3 className="text-lg font-medium capitalize mb-4">
                                        {dictionary?.billingAddress}
                                    </h3>

                                    {addressAttributes?.map((attribute) => {
                                        return (
                                            <div
                                                key={attribute?.name}
                                                className='py-2'
                                            >
                                                <label
                                                    htmlFor={`shippingAddress.${attribute?.name}`}
                                                    className={`text-gray-600 mb-2 block capitalize ${attribute?.required ? 'required' : ''}`}>
                                                    {dictionary?.[attribute?.name]}
                                                </label>
                                                <input
                                                    name={`shippingAddress.${attribute?.name}`}
                                                    id={`shippingAddress.${attribute?.name}`}
                                                    type={attribute?.type}
                                                    value={values?.['shippingAddress']?.[attribute?.name]}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"

                                                    style={{ border: (touched?.['shippingAddress']?.[attribute?.name] && errors?.['shippingAddress']?.[attribute?.name]) ? '2px solid red' : '' }}

                                                    placeholder={`Ex: ${attribute?.name}`}
                                                />

                                                {(touched?.['shippingAddress']?.[attribute?.name] && errors?.['shippingAddress']?.[attribute?.name]) && (
                                                    <span
                                                        className="float-right mr-2 -mt-8 relative z-50 text-red-500"
                                                    >
                                                        <ErrorTooltip
                                                            content={errors?.['shippingAddress']?.[attribute?.name]}
                                                            placement="right"
                                                            origin={`shippingAddress-${attribute?.name}`}
                                                        />
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    })
                                    }

                                </div>

                            </div>
                        </div>
                    </div>


                    {/* ORDER SUMMARY */}
                    <div className="col-span-4 border border-gray-200 p-4 rounded">

                        <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">

                            {dictionary?.orderSummary}
                        </h4>

                        <div className="space-y-2">

                            {modifiedAuth?.cartItems?.map((item) => {
                                return (
                                    <div
                                        key={item?.id}
                                        className="flex justify-between"
                                    >
                                        <div className='w-[60%]'>

                                            <h5 className="text-gray-800 font-medium">
                                                {item?.name}
                                            </h5>

                                            {/* <p className="text-sm text-gray-600">
                                                Size: M
                                            </p> */}
                                        </div>

                                        <div className='w-[40%] flex justify-between'>

                                            <div className="text-gray-600">
                                                x{item?.cartData?.productCount}
                                            </div>

                                            <div className="text-gray-800 font-medium">
                                                ${calculateNewPrice(item?.price, item?.discountPercent)}
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                            }


                        </div>

                        {/* SUB-TOTAL */}
                        <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
                            <div className='w-[60%]'>
                                {dictionary?.subtotal}
                            </div>
                            <div className='w-[40%] flex justify-end'>
                                ${calculateSubtotal()}
                            </div>
                        </div>

                        {/* SHIPPING CHARGE */}
                        <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
                            <div className='w-[60%]'>
                                {dictionary?.shipping}
                            </div>
                            <div className='w-[40%] flex justify-end'>
                                {dictionary?.free}
                            </div>
                        </div>

                        {/* TOTAL */}
                        <div className="flex justify-between text-gray-800 font-medium py-3 uppercase">
                            <div className='w-[60%] font-semibold'>
                                {dictionary?.total}
                            </div>
                            <div className='w-[40%] flex justify-end'>
                                ${calculateSubtotal()}
                            </div>
                        </div>

                        <div className="flex items-center mb-4 mt-2">
                            <input
                                type="checkbox"
                                name="agreement"
                                id="agreement"
                                checked={values?.['agreeTerms']}
                                className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"

                                onChange={(e) => {
                                    setValues((value) => ({
                                        ...value,
                                        'agreeTerms': e?.target?.checked
                                    }));
                                }}
                            />
                            <label
                                htmlFor="agreement"
                                className="text-gray-600 ml-3 cursor-pointer text-sm">
                                {dictionary?.iAgree}
                                <Link href={"#"}
                                    className="text-primary mx-2">
                                    {dictionary?.termsAndCondition}

                                </Link>
                            </label>

                            {(touched?.['agreeTerms'] && errors?.['agreeTerms']) && (
                                <span
                                    className="float-right relative z-50 text-red-500"
                                >
                                    <ErrorTooltip
                                        origin={'agreeTerms'}
                                        content={errors?.['agreeTerms']}
                                        placement="right"
                                    />
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">
                            Place order
                        </button>
                    </div>

                </div>

                {/* Submit Button */}
                {/* <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                        {dictionary?.submit}
                    </button>
                </div> */}

            </form>
        </>
    )
}

export default CheckoutForm
