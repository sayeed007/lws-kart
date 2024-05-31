/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useModifiedAuth } from '@/hooks/useModifiedAuth';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UserAddressForPDF = ({ dictionary, userId }) => {

    const { modifiedAuth } = useModifiedAuth();

    const [userAddress, setUserAddress] = useState({});
    const [refetchData, setRefetchData] = useState(false);


    useEffect(() => {
        const fetchUserAddressData = async () => {
            try {
                const response = await axios.get(`/api/auth/userAddress/${userId}`);

                // Handle response.data as needed
                setUserAddress(response?.data);


            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchUserAddressData();
    }, [refetchData]);

    return (
        <>

            <div className='flex my-6 w-full justify-between'>

                {/* SHIPPING ADDRESS */}
                <div className='flex flex-col w-1/2'>

                    <div>
                        <h3 className="font-bold text-gray-800 text-lg cursor-pointer">
                            Shipping Address
                        </h3>
                    </div>

                    <div className="space-y-1">

                        <h4 className="text-gray-700 text-xl capitalize">
                            {modifiedAuth?.sessionInfo?.user?.name}
                        </h4>

                        {userAddress?.['shippingAddress']?.division ?
                            Object.entries(userAddress?.['shippingAddress'])?.map(([key, value], index) => {
                                if (key !== '_id') {
                                    return (
                                        <p
                                            className="text-gray-800"
                                            key={key}
                                        >
                                            {dictionary?.[key]}:  <span className='font-bold'>{value ? value : 'N/A'}</span>
                                        </p>
                                    )
                                }
                            })
                            :
                            <div className='font-bold'>
                                No address is set.
                            </div>
                        }

                    </div>

                </div>


                {/* BILLING ADDRESS */}
                <div className='flex flex-col w-1/2'>
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg cursor-pointer">
                            Billing Address
                        </h3>
                    </div>

                    <div className="space-y-1">

                        <h4 className="text-gray-700 text-xl capitalize">
                            {modifiedAuth?.sessionInfo?.user?.name}
                        </h4>

                        {userAddress?.['billingAddress']?.division ?
                            Object.entries(userAddress?.['billingAddress'])?.map(([key, value], index) => {
                                if (key !== '_id') {
                                    return (
                                        <p
                                            className="text-gray-800"
                                            key={key}
                                        >
                                            {dictionary?.[key]}:  <span className='font-bold'>{value ? value : 'N/A'}</span>
                                        </p>
                                    )
                                }
                            })
                            :
                            <div className='font-bold'>
                                No address is set.
                            </div>
                        }

                    </div>
                </div>




            </div>
        </>
    )
}

export default UserAddressForPDF
