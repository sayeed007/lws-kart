"use client"

import { login } from '@/app/actions';
import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import ErrorTooltip from '../Common/utilities/ErrorToltip';
import { toast } from 'react-toastify';
import axios from 'axios';

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

            if (response?.[0]) {
                fetchUserDetails();
            } else {
                toast.error(response?.[1], {
                    onClose: () => {
                        resetForm();
                        router.refresh()
                    }
                });
            }

        } catch (error) {
            console.error(error?.message ? error?.message : error);
            toast.error(error?.message ? error?.message : error);
        }


    };



    const fetchUserDetails = async () => {
        try {

            const response = await axios.get(`/api/auth/userSession`);

            // IF USER REQUESTED ANYTHING ON LAST HIT

            const lastAction = Cookies?.get('lastAction') ? JSON.parse(Cookies?.get('lastAction')) : {};

            if (lastAction.action && response?.data?.sessionInfo?.user?.id) {
                madeActionOnLastRequest(lastAction, response);
            } else {
                setModifiedAuth(response?.data);
                router.replace(`/${lang}`);
            }

        } catch (error) {
            console.error('User Session information fetching error:', error);
        }
    };


    const madeActionOnLastRequest = async (lastAction, response) => {

        switch (lastAction?.action) {

            case 'addToWishlist':

                // ADD ITEM TO WISHLIST
                const wishResponse = await axios.post('/api/auth/wishlist', {
                    productId: lastAction?.productId,
                    userId: response?.data?.sessionInfo?.user?.id,
                }, {
                    headers: {
                        'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                        'Content-Type': 'application/json'
                    }
                });

                // IF SUCCESSFUL THEN SHOW MESSAGE AND SET MODIFIED AUTH
                if (wishResponse?.data?.wishedProduct) {

                    toast.success("Your last request to add product in your wishlist is successful, showing your wishlist.",
                        {
                            onClose: () => {
                                setModifiedAuth({
                                    ...response?.data,
                                    wishlistItems: [...wishResponse?.data?.wishedProduct]
                                });

                                Cookies.remove('lastAction');
                                router.push(`/${lastAction?.lang}/wishList`);
                            }
                        });

                } else {
                    toast.warning(response?.data?.message);
                }

                break;
            case 'addToCart':
                const cartResponse = await axios.post('/api/auth/cart', {
                    productId: lastAction?.productId,
                    userId: response?.data?.sessionInfo?.user?.id,
                    addedTime: new Date(),
                    expirationTime: new Date(new Date().getTime() + 30 * 60 * 1000), // 30 minutes later,
                    productCount: lastAction?.productCount
                }, {
                    headers: {
                        'Authorization': `Bearer ${modifiedAuth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                        'Content-Type': 'application/json'
                    }
                });


                if (cartResponse?.data?.addToCartList) {

                    toast.success("Your last request to add product in your cart is successful, showing your cart.",
                        {
                            onClose: () => {
                                setModifiedAuth({
                                    ...response?.data,
                                    cartItems: response.data?.cartItems
                                });

                                Cookies.remove('lastAction');
                                router.push(`/${lastAction?.lang}/cart`);
                            }
                        });

                } else {
                    toast.error(response?.data?.message);
                }

                break;

            case 'wishListVisit':
                toast.success("Your last request was to view your wishlist, showing your wishList.",
                    {
                        onClose: () => {
                            setModifiedAuth({
                                ...response?.data,
                            });

                            Cookies.remove('lastAction');
                            router.push(`/${lastAction?.lang}/wishList`);
                        }
                    });
                break;

            case 'cartVisit':
                toast.success("Your last request was to view your cart, showing your cart.",
                    {
                        onClose: () => {
                            setModifiedAuth({
                                ...response?.data,
                            });

                            Cookies.remove('lastAction');
                            router.push(`/${lastAction?.lang}/cart`);
                        }
                    });
                break;

            case 'profileVisit':
                toast.success("Your last request was to view your profile, showing you your profile.",
                    {
                        onClose: () => {
                            setModifiedAuth({
                                ...response?.data,
                            });

                            Cookies.remove('lastAction');
                            router.push(`/${lastAction?.lang}/account/${response?.data?.sessionInfo?.user?.id}`);
                        }
                    });
                break;


            default:
                break;

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
                        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium cursor-pointer">
                        {dictionary?.log_in}
                    </button>
                </div>

            </form>

        </>
    )
}

export default LogInForm
