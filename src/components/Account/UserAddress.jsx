"use client"

import React, { useEffect, useState } from 'react'
import ShippingAndBillingAddress from './ShippingAndBillingAddress'
import axios from 'axios';

const UserAddress = ({ lang, dictionary, userId }) => {


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


    // const userAddress = await getUserAddress(userId);
    // console.log(userAddress);



    return (
        <>
            {/* SHIPPING ADDRESS */}
            <ShippingAndBillingAddress
                lang={lang}
                dictionary={dictionary}
                userId={userId}
                type={'shippingAddress'}
                userAddress={userAddress}
                refetchData={refetchData}
                setRefetchData={setRefetchData}
            />

            {/* BILLING ADDRESS */}
            <ShippingAndBillingAddress
                lang={lang}
                dictionary={dictionary}
                userId={userId}
                type={'billingAddress'}
                userAddress={userAddress}
                refetchData={refetchData}
                setRefetchData={setRefetchData}
            />
        </>
    )
}

export default UserAddress