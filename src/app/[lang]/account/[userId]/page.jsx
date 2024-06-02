import PersonalInfo from "@/components/Account/PersonalInfo";
import UserAddress from "@/components/Account/UserAddress";
import BreadCrumb from "@/components/Common/BreadCrumb";
import { getUserOngoingOrder, getUserPreviousOrder } from "@/database/queries";
import connectMongo from "@/service/connectMongo";
import { calculateNewPrice } from "@/utils/data-util";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import EmptyBox from '../../../../../public/assets/images/EmptyBox.jpeg';
import { getDictionary } from "../../../../../public/dictionary/dictionaries";



export async function generateMetadata({ params: { lang, userId } }) {

    return {
        title: "LWS-kart | Learn with Sumit",
        description: `Personal & Product Purchase Information about user - ${userId}`,
    }
};


const AccountPage = async ({ params: { lang, userId } }) => {
    await connectMongo();

    const dictionary = await getDictionary(lang);
    const userOngoingOrder = await getUserOngoingOrder(userId);
    const userPreviousOrder = await getUserPreviousOrder(userId);


    return (
        <>

            {/* breadcrumb */}
            <BreadCrumb
                lang={lang}
                route={dictionary?.account}
            />
            {/* breadcrumb */}


            {/* Ongoing Order */}

            <div className="container items-start gap-6 pt-4">
                <div className="grid grid-cols-2 gap-4 mx-auto max-w-5xl">
                    <div className="py-2 text-green-500 font-bold text-xl">
                        {dictionary?.ongoingOrders}
                    </div>
                </div>
            </div>

            {userOngoingOrder?.length > 0 ?

                <div className="container items-start gap-6 pt-4 pb-16">

                    <div className="grid grid-cols-3 gap-4 mx-auto max-w-5xl">


                        {userOngoingOrder?.map((ongoingOrder) => {
                            return (
                                <div className="shadow rounded bg-white px-4 pt-6 pb-8" key={ongoingOrder?.id}>

                                    <div className="py-2">
                                        {dictionary?.invoiceNumber}:<span className="font-bold ml-2 break-keep">{ongoingOrder?.id}</span>
                                    </div>

                                    <div className="py-2">
                                        {dictionary?.orderTime}:<span className="font-bold uppercase ml-2"> {moment(ongoingOrder?.orderTime).format('DD MMM, YYYY')}</span>
                                    </div>

                                    <div className="py-2">
                                        {dictionary?.status}:<span className="font-bold uppercase"> {ongoingOrder?.status}</span>
                                    </div>

                                    {/* PRODUCTS */}
                                    {ongoingOrder?.orderDetailsId?.map((eachIndividualOrder) => {
                                        return (
                                            <div
                                                key={eachIndividualOrder?.productId?._id}
                                                className="flex justify-between items-center my-2"
                                            >
                                                <div className='flex w-[70%]'>

                                                    <div className="w-1/5 rounded-full">
                                                        <Image
                                                            src={eachIndividualOrder?.productId?.images?.[0]}
                                                            alt={eachIndividualOrder?.productId?.name}
                                                            className="w-full rounded-full border-2 border-black"
                                                            width={30}
                                                            height={30}
                                                        />
                                                    </div>

                                                    <div className="w-4/5 mx-2 flex items-center">
                                                        <h5 className="text-gray-800 font-medium">
                                                            {eachIndividualOrder?.productId?.name}
                                                        </h5>
                                                    </div>
                                                </div>

                                                <div className='w-[30%] flex justify-between'>

                                                    <div className="text-gray-600">
                                                        x{eachIndividualOrder?.count}
                                                    </div>

                                                    <div className="text-gray-800 font-medium">
                                                        ${calculateNewPrice(eachIndividualOrder?.price, eachIndividualOrder?.discount)}
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })}

                                    {/* SHIPPING CHARGE */}
                                    {/* <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
                                        <div className='w-[70%]'>
                                            {dictionary?.shipping}
                                        </div>
                                        <div className='w-[30%] flex justify-end'>
                                            {dictionary?.free}
                                        </div>
                                    </div> */}

                                    {/* TOTAL */}
                                    <div className="flex justify-between text-gray-800 font-medium pt-3 uppercase">
                                        <div className='w-[70%] font-semibold'>
                                            {dictionary?.total}
                                        </div>
                                        <div className='w-[30%] flex justify-end'>
                                            ${ongoingOrder?.totalPrice}
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <Link
                                            href={`/${lang}/invoice/${ongoingOrder?.id}`}
                                            className="flex w-1/3 justify-end">
                                            <div className="bg-blue-400 text-white px-4 py-2 h-10 cursor-pointer">
                                                Details
                                            </div>
                                        </Link>
                                    </div>


                                </div>
                            )
                        })}

                    </div>
                </div>
                :
                <div className="flex flex-col w-full justify-center items-center">
                    <Image
                        src={EmptyBox}
                        alt={'No Ongoing Order'}
                        width={300}
                        height={150}
                    />
                    <div className="text-xl my-3 font-bold">
                        {dictionary?.noOngoingOrder}
                    </div>
                </div>
            }


            {/* Previous Order */}

            <div className="container items-start gap-6 pt-4">
                <div className="grid grid-cols-2 gap-4 mx-auto max-w-5xl">
                    <div className="py-2 text-green-500 font-bold text-xl">
                        {dictionary?.previousOrders}
                    </div>
                </div>
            </div>

            {userPreviousOrder?.length > 0 ?

                <div className="container items-start gap-6 pt-4 pb-16">

                    <div className="grid grid-cols-2 gap-4 mx-auto max-w-5xl">


                        {userPreviousOrder?.map((previousOrder) => {
                            return (
                                <div className="shadow rounded bg-white px-4 pt-6 pb-8" key={previousOrder?.id}>

                                    <div className="py-2">
                                        {dictionary?.invoiceNumber}:<span className="font-bold ml-2 break-keep">{previousOrder?.id}</span>
                                    </div>

                                    <div className="py-2">
                                        {dictionary?.orderTime}:<span className="font-bold uppercase ml-2"> {moment(previousOrder?.orderTime).format('DD MMM, YYYY')}</span>
                                    </div>

                                    <div className="py-2">
                                        {dictionary?.status}:<span className="font-bold uppercase"> {previousOrder?.status}</span>
                                    </div>

                                    {/* PRODUCTS */}
                                    {/* {previousOrder?.orderDetailsId?.map((eachIndividualOrder) => {
                                        return (
                                            <div
                                                key={eachIndividualOrder?.productId?._id}
                                                className="flex justify-between items-center my-2"
                                            >
                                                <div className='flex w-[70%]'>

                                                    <div className="w-1/5 rounded-full">
                                                        <Image
                                                            src={eachIndividualOrder?.productId?.images?.[0]}
                                                            alt={eachIndividualOrder?.productId?.name}
                                                            className="w-full rounded-full border-2 border-black"
                                                            width={30}
                                                            height={30}
                                                        />
                                                    </div>

                                                    <div className="w-4/5 mx-2 flex items-center">
                                                        <h5 className="text-gray-800 font-medium">
                                                            {eachIndividualOrder?.productId?.name}
                                                        </h5>
                                                    </div>
                                                </div>

                                                <div className='w-[30%] flex justify-between'>

                                                    <div className="text-gray-600">
                                                        x{eachIndividualOrder?.count}
                                                    </div>

                                                    <div className="text-gray-800 font-medium">
                                                        ${calculateNewPrice(eachIndividualOrder?.price, eachIndividualOrder?.discount)}
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })} */}

                                    {/* SHIPPING CHARGE */}
                                    {/* <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
                                        <div className='w-[70%]'>
                                            {dictionary?.shipping}
                                        </div>
                                        <div className='w-[30%] flex justify-end'>
                                            {dictionary?.free}
                                        </div>
                                    </div> */}

                                    {/* TOTAL */}
                                    <div className="flex justify-between text-gray-800 font-medium pt-3 uppercase">
                                        <div className='w-[70%] font-semibold'>
                                            {dictionary?.total}
                                        </div>
                                        <div className='w-[30%] flex justify-end'>
                                            ${previousOrder?.totalPrice}
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <Link
                                            href={`/${lang}/invoice/${previousOrder?.id}`}
                                            className="flex w-1/3 justify-end">
                                            <div className="bg-blue-400 text-white px-4 py-2 h-10 cursor-pointer">
                                                Details
                                            </div>
                                        </Link>
                                    </div>


                                </div>
                            )
                        })}

                    </div>
                </div>
                :
                <div className="flex flex-col w-full justify-center items-center">
                    <Image
                        src={EmptyBox}
                        alt={'No Previous Order'}
                        width={300}
                        height={150}
                    />
                    <div className="text-xl my-3 font-bold">
                        {dictionary?.noPreviousOrder}
                    </div>
                </div>
            }


            {/* account wrapper */}
            <div className="container items-start gap-6 pt-4 pb-16">

                {/* info */}
                <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">

                    {/* PERSONAL INFO */}
                    <PersonalInfo
                        lang={lang}
                        dictionary={dictionary}
                        userId={userId}
                    />


                    {/* USER ADDRESS */}
                    <UserAddress
                        lang={lang}
                        dictionary={dictionary}
                        userId={userId}
                    />

                </div>
                {/* ./info */}

            </div>
            {/* ./account wrapper */}



        </>
    )
}

export default AccountPage