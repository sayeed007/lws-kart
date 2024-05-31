"use client"



import moment from "moment";
import numberToWords from 'number-to-words';
import LWSLogo from '../../../public/assets/images/logo.svg';
import UserAddressForPDF from './UserAddressForPDF';
import { useRef } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Image from "next/image";



const InvoiceComponent = ({ orderDetailsFromServer = {}, dictionary }) => {

    const orderDetails = JSON.parse(orderDetailsFromServer);

    const divRef = useRef();

    const calculateDiscountAmount = (price, discountPercent) => {
        return (price * (discountPercent / 100));
    };

    const calculateTotalPrice = (price, discountPercent, unit) => {
        return ((price - (price * (discountPercent / 100))) * unit);
    };


    const exportToPdf = async () => {
        const input = divRef.current;

        try {
            const canvas = await html2canvas(input, {
                useCORS: true,
                allowTaint: true,
                logging: true,
                scrollX: 0,
                scrollY: 0,
                width: input.scrollWidth,
                height: input.scrollHeight,
                backgroundColor: null,
                onclone: (clonedDoc) => {
                    const images = clonedDoc.getElementsByTagName('img');
                    for (let img of images) {
                        if (!img.complete) {
                            img.crossOrigin = 'anonymous';
                            img.loading = 'eager';
                        }
                    }
                }
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'px', [input.scrollWidth + 20, input.scrollHeight + 30]);

            pdf.addImage(imgData, 'PNG', 10, 10, input.scrollWidth, input.scrollHeight);
            pdf.save(`Invoice-${orderDetails?.id}.pdf`);
        } catch (error) {
            console.error('Error generating PDF: ', error);
        }
    };




    return (
        <>


            <div
                className="container"
                ref={divRef}>

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
                                                    <Image
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
                                        Total in words: <span className="ml-6 font-bold">{numberToWords?.toWords(orderDetails?.totalPrice)}</span>
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
                <UserAddressForPDF
                    dictionary={dictionary}
                    userId={orderDetails?.userId.toString()}
                />

                {/* GREETINGS */}
                <div className="flex w-full justify-center my-8 font-ita">
                    <i>
                        Thank you for your support and shopping from us, See you soon.
                    </i>
                </div>

            </div>


            {/* PRINT */}
            <div className="flex w-full justify-center my-8 font-ita">
                <button
                    className="bg-primary border border-primary text-white px-8 py-2 rounded-md hover:bg-transparent  hover:text-primary transition hidden md:flex md:items-center cursor-pointer"
                    onClick={() => exportToPdf()}
                >
                    Print
                </button>
            </div>


        </>
    )
}

export default InvoiceComponent
