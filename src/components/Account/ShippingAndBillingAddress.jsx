"use client"


import Link from 'next/link'
import { useEffect, useState } from 'react'
import AddOrEditAddress from './AddOrEditAddress';
import { useModifiedAuth } from '@/hooks/useModifiedAuth';

const ShippingAndBillingAddress = ({ lang, dictionary, userId, type, userAddress, refetchData, setRefetchData }) => {

    const { modifiedAuth } = useModifiedAuth();

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>

            {modalVisible &&
                <AddOrEditAddress
                    dictionary={dictionary}
                    previousData={userAddress}
                    type={type}
                    userId={userId}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    refetchData={refetchData}
                    setRefetchData={setRefetchData}
                />

            }

            <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                <div className="flex items-center justify-between mb-4">

                    <h3 className="font-medium text-gray-800 text-lg cursor-pointer">
                        {/* {type === 'shippingAddress' ? 'Shipping' : 'Billing'} Address */}
                        {dictionary?.[type]}
                    </h3>

                    <div
                        onClick={() => setModalVisible(true)}
                        className='cursor-pointer'
                    >
                        {userAddress?.[type]?.division ?
                            <span className="text-primary">
                                {dictionary?.edit}
                            </span>
                            :
                            <span className="text-blue-500">
                                {dictionary?.add}
                            </span>
                        }
                    </div>

                </div>

                <div className="space-y-1">

                    <h4 className="text-gray-700 font-medium">
                        {modifiedAuth?.sessionInfo?.user?.name}
                    </h4>



                    {userAddress?.[type]?.division ?
                        Object.entries(userAddress?.[type])?.map(([key, value], index) => {
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
                            You do not add address yet.
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default ShippingAndBillingAddress
