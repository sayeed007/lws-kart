import React from 'react';
import { Email, Html, Head, Body, Img, Tailwind } from '@react-email/components';
import moment from 'moment';
import { numberToWords } from 'number-to-words';
import LWSLogo from '../../../public/assets/images/logo.svg';

const InvoiceForEmail = ({ userName, orderDetails, dictionary, userAddress, invoiceLink }) => {
    const calculateDiscountAmount = (price, discountPercent) => {
        return price * (discountPercent / 100);
    };

    const calculateTotalPrice = (price, discountPercent, unit) => {
        return (price - price * (discountPercent / 100)) * unit;
    };

    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            brand: "#007291",
                        },
                    },
                },
            }}
        >

            <Email title="Invoice for your recent order">
                <Html lang="en">
                    <Head>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="width=device-width" />
                        <title>Invoice</title>
                    </Head>
                    <Body>
                        <div>
                            Hello <span className="font-bold capitalize">{userName}</span>,
                        </div>

                        <div>
                            Thank you for your recent order. Here are the details of your order:
                        </div>


                        <div
                            className="container"
                        >

                            {/* HEADER - LOGO AND INVOICE INFORMATION */}
                            <div className="flex w-full justify-between items-center">

                                {/* LOGO */}
                                <div>
                                    <LWSLogo
                                        alt="Logo"
                                        width={300}
                                        height={'auto'}
                                    />
                                    <div className="ml-[100px]">
                                        <p className="text-[#00D991]">
                                            {dictionary?.heroTitle}
                                        </p>
                                    </div>
                                </div>


                                {/* INVOICE DETAILS */}
                                <div className="flex flex-col">
                                    <div className="py-2">
                                        {dictionary?.invoiceNumber}:<span className="font-bold ml-2">{orderDetails?.id}</span>
                                    </div>

                                    <div className="py-2">
                                        {dictionary?.orderTime}:<span className="font-bold uppercase ml-2"> {moment(orderDetails?.orderTime).format('DD MMM, YYYY')}</span>
                                    </div>
                                </div>

                            </div>

                            {/* SECOND HEADER - SHOP ADDRESS */}
                            <div className="flex flex-col mt-4 font-bold">
                                {/* Company Name */}
                                <div className="py-1">
                                    LWS-Kart - Home Decoration Center
                                </div>

                                {/* Company Location */}
                                <div className="py-1">
                                    Ka-13/B, Lichu Bagan Road
                                </div>
                                <div className="py-1">
                                    Vatara, Dhaka - 1203
                                </div>

                                {/* MOBILE */}
                                <div className="py-1">
                                    +8801934939844
                                </div>

                                {/* EMAIL */}
                                <div className="py-1">
                                    bappy143081@gmail.com
                                </div>
                            </div>

                            {/* INVOICE TITLE */}
                            <div className="flex w-full justify-center text-3xl font-bold text-[#00D991]">
                                Invoice
                            </div>

                            {/* INVOICE CONTENT */}
                            <div className="flex flex-col mt-4">
                                <div className="overflow-x-auto">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
                                        // style={{
                                        //     backgroundImage: "url('../../../../../public/assets/images/logo.svg')",
                                        //     backgroundSize: 'cover',
                                        //     backgroundRepeat: 'no-repeat',
                                        //     backgroundPosition: 'center'
                                        // }}
                                        >

                                            <table className="min-w-full divide-y divide-gray-200">

                                                <thead className="bg-gray-100 font-bold">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">
                                                            SN
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">
                                                            Product Name
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">
                                                            Unit Price
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">
                                                            Discount Amount
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">
                                                            Quantity
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">
                                                            Price
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {/* Table rows */}
                                                    {(orderDetails?.orderDetailsId)?.map((item, index) => (
                                                        <tr key={index} className={index % 2 === 0 ? 'bg-white-100' : 'bg-gray-100'}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {index + 1}
                                                            </td>
                                                            <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                <Img
                                                                    src={item?.productId?.images?.[0]}
                                                                    alt={item?.productId?.name}
                                                                    className="rounded-full border-2 border-black"
                                                                    width={30}
                                                                    height={30}
                                                                />

                                                                <span className="ml-2">
                                                                    {item.productId?.name}
                                                                </span>

                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {item?.price}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {calculateDiscountAmount(item?.price, item?.productId?.discountPercent)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                x{item?.count}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {calculateTotalPrice(item?.price, item?.productId?.discountPercent, item?.count)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {/* Add more rows as needed */}
                                                </tbody>
                                            </table>




                                            {/* TOTAL */}
                                            <div className="flex w-full justify-between items-center mt-16 min-h-[100px] bg-gray-100 p-3">

                                                {/* TOTAL IN WORD */}
                                                <div>
                                                    Total in words: <span className="ml-6 font-bold">
                                                        {numberToWords?.toWords(orderDetails?.totalPrice ? orderDetails?.totalPrice : 0)}
                                                    </span>
                                                </div>

                                                {/* TOTAL */}
                                                <div className="mr-16">
                                                    Total: <span className="ml-6 font-bold">{orderDetails?.totalPrice}</span>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ADDRESSES */}
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
                                            {userName}
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
                                            {userName}
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

                            {/* GREETINGS */}
                            <div className="flex w-full justify-center my-8 font-ita">
                                <i>
                                    Thank you for your support and shopping from us, See you soon.
                                </i>
                            </div>


                            {/*  */}
                            <div>
                                You can view your invoice by clicking the following link:
                                <p>
                                    <a
                                        className="bg-primary border border-primary text-white px-8 py-2 rounded-md hover:bg-transparent  hover:text-primary transition hidden md:flex md:items-center cursor-pointer"

                                        href={invoiceLink}>
                                        View Invoice
                                    </a>
                                </p>
                            </div>

                        </div>


                    </Body>
                </Html>
            </Email>


        </Tailwind>
    );
}

export default InvoiceForEmail;
