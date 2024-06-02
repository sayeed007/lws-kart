/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useModifiedAuth } from '@/hooks/useModifiedAuth'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import EditProfileInformation from './EditProfileInformation'

const PersonalInfo = ({ lang, dictionary, userId }) => {


    const [userInfo, setUserInfo] = useState({});
    const [refetchData, setRefetchData] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/auth/userInfo`);

                // Handle response.data as needed
                if (response?.data?.userInfo) {
                    const userInfo = response.data.userInfo;

                    if (userInfo?.image) {
                        userInfo.photo = userInfo?.image ? userInfo.image : '';
                        delete userInfo.image;
                    };

                    setUserInfo({ ...userInfo });
                };


            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchUserData();
    }, [refetchData]);


    return (
        <>
            {modalVisible &&
                <EditProfileInformation
                    lang={lang}
                    dictionary={dictionary}

                    previousData={userInfo}

                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}

                    refetchData={refetchData}
                    setRefetchData={setRefetchData}
                />

            }


            <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                <div className="flex items-center justify-between mb-4">

                    <h3 className="font-medium text-gray-800 text-lg">
                        {dictionary?.personalProfile}
                    </h3>

                    <div
                        onClick={() => setModalVisible(true)}
                        className="text-primary cursor-pointer">
                        {dictionary?.edit}
                    </div>

                </div>

                <div className="space-y-1 flex flex-col w-full justify-center items-center">

                    {/* PROFILE IMAGE */}
                    {userInfo?.photo ?
                        <Image
                            src={userInfo?.photo}
                            alt={userInfo?.photo}
                            className="rounded-full border-2 border-black"
                            width={150}
                            height={150}
                        />
                        :
                        <>
                            <div className='bg-[#FD3D57] mr-4 flex justify-center items-center font-bold text-3xl h-[100px] w-[100px] border-2 border-black rounded-full'>
                                {userInfo?.name?.[0]}
                            </div>
                        </>
                    }

                    <h4 className="text-gray-700 my-4 font-bold">
                        {userInfo?.name}
                    </h4>

                    <p className="text-gray-800 my-4">
                        {userInfo?.email}
                    </p>

                    <p className="text-gray-800 my-4">
                        {userInfo?.mobile}
                    </p>

                </div>
            </div>
        </>
    )
}

export default PersonalInfo
