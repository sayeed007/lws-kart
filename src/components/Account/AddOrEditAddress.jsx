import React, { useState } from 'react';
import Modal from '../Common/utilities/Modal';
import { useFormik } from 'formik';
import { Form, Field } from 'formik';
import ErrorTooltip from '../Common/utilities/ErrorToltip';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';


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
    userId: ''
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


const AddOrEditAddress = ({ dictionary, previousData, type, userId, setModalVisible, modalVisible, refetchData, setRefetchData }) => {

    const { auth } = useAuth();

    console.log(type);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { handleSubmit, handleChange, values, touched, errors, handleBlur, setValues, resetForm, setErrors, handleReset, isSubmitting } = useFormik({
        initialValues: previousData?.[type] ? { ...previousData } : { ...initialFormData },
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            [type]: Yup.object().shape({
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
            userId: Yup.string()
            // .required('User ID is required')
        }),

        onSubmit: (values) => {

            submitResolver({
                ...values,
                userId: values?.userId ? values?.userId : userId
            });

        }
    });


    const submitResolver = async (value) => {
        try {
            setLoading(true);
            setError(null);

            // EDIT MODE
            if (previousData?._id) {
                console.log(value);
                const response = await axios.put(`/api/auth/userAddress/${previousData?._id}`, {
                    userAddress: value,
                }, {
                    headers: {
                        'Authorization': `Bearer ${auth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                        'Content-Type': 'application/json'
                    }
                });
            }
            else {
                const response = await axios.post('/api/auth/userAddress', {
                    userAddress: value,
                }, {
                    headers: {
                        'Authorization': `Bearer ${auth?.loggedInUserInfo?.access_token}`, // Replace YOUR_TOKEN_HERE with the user's bearer token
                        'Content-Type': 'application/json'
                    }
                });
            }

            setLoading(false);
            setSuccess(true);

            setRefetchData(!refetchData);
            setModalVisible(!modalVisible);

        } catch (error) {
            setLoading(false);
            setError(error || 'Something went wrong');
            console.error('Add New Address error:', error);
        }
    };

    console.log(values);

    return (

        <Modal
            modalTitle={`${previousData?.[type] ? 'Edit' : 'Add'} ${type === 'shippingAddress' ? 'Shipping' : 'Billing'} Address`}
            onDismiss={() => setModalVisible(!modalVisible)}
        >

            <div className="w-full mx-auto h-[80vh] overflow-y-auto">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit()
                    }}
                    autoComplete="true">

                    <div className="space-y-2">


                        {addressAttributes?.map((attribute) => {
                            return (
                                <div
                                    key={attribute?.name}
                                    className='py-2'
                                >
                                    <label
                                        htmlFor={`${type}.${attribute?.name}`}
                                        className={`text-gray-600 mb-2 block capitalize ${attribute?.required ? 'required' : ''}`}>
                                        {dictionary?.[attribute?.name]}
                                    </label>
                                    <input
                                        name={`${type}.${attribute?.name}`}
                                        id={`${type}.${attribute?.name}`}
                                        type={attribute?.type}
                                        value={values?.[type]?.[attribute?.name]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"

                                        style={{ border: (touched?.[type]?.[attribute?.name] && errors?.[type]?.[attribute?.name]) ? '2px solid red' : '' }}

                                        placeholder={attribute?.name}
                                    />

                                    {(touched?.[type]?.[attribute?.name] && errors?.[type]?.[attribute?.name]) && (
                                        <span
                                            className="float-right mr-2 -mt-8 relative z-50 text-red-500"
                                        >
                                            <ErrorTooltip
                                                content={errors?.[type]?.[attribute?.name]}
                                                placement="right"
                                            />
                                        </span>
                                    )}
                                </div>
                            )
                        })
                        }


                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                                {dictionary?.submit}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddOrEditAddress;
