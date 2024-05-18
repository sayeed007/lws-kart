import PersonalInfo from "@/components/Account/PersonalInfo";
import ShippingAndBillingAddress from "@/components/Account/ShippingAndBillingAddress";
import BreadCrumb from "@/components/Common/BreadCrumb";
import { getDictionary } from "../../../../public/dictionary/dictionaries";
import Link from "next/link";


const CheckoutPage = async ({ params: { lang } }) => {


    const dictionary = await getDictionary(lang);



    return (
        <>
            {/* breadcrumb */}
            <BreadCrumb
                lang={lang}
                route={dictionary?.checkout}
            />
            {/* breadcrumb */}


            {/* wrapper */}
            <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">


                {/* CHECKOUT ADDRESS */}
                <div className="col-span-8 border border-gray-200 p-4 rounded">

                    <h3 className="text-lg font-medium capitalize mb-4">
                        {dictionary?.checkout}
                    </h3>

                    <div className="space-y-4">

                        {/* NAME */}
                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label
                                    htmlFor="first-name"
                                    className="text-gray-600">
                                    {dictionary?.firstName}
                                    <span className="text-primary mx-1">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    className="input-box"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="last-name"
                                    className="text-gray-600">
                                    {dictionary?.lastName}
                                    <span className="text-primary mx-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    className="input-box"
                                />
                            </div>

                        </div>

                        {/* COMPANY */}
                        <div>
                            <label
                                htmlFor="company"
                                className="text-gray-600">
                                {dictionary?.company}
                            </label>
                            <input
                                type="text"
                                name="company"
                                id="company"
                                className="input-box"
                            />
                        </div>

                        {/* COUNTRY */}
                        <div>
                            <label
                                htmlFor="region"
                                className="text-gray-600">
                                {dictionary?.country}
                            </label>
                            <input
                                type="text"
                                name="region"
                                id="region"
                                className="input-box"
                            />
                        </div>

                        {/* STREET */}
                        <div>
                            <label
                                htmlFor="address"
                                className="text-gray-600">
                                {dictionary?.street}
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                className="input-box"
                            />
                        </div>

                        {/* CITY */}
                        <div>
                            <label
                                htmlFor="city"
                                className="text-gray-600">
                                {dictionary?.city}
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                className="input-box"
                            />
                        </div>

                        {/* PHONE NUMBER */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="text-gray-600">
                                {dictionary?.phone}
                            </label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                className="input-box"
                            />
                        </div>

                        {/* Email Address */}
                        <div>
                            <label
                                htmlFor="email"
                                className="text-gray-600">
                                {dictionary?.email}
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="input-box"
                            />
                        </div>

                    </div>
                </div>


                {/* ORDER SUMMARY */}
                <div className="col-span-4 border border-gray-200 p-4 rounded">

                    <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">

                        {dictionary?.orderSummary}
                    </h4>

                    <div className="space-y-2">

                        {[1, 2, 3, 4]?.map((item) => {
                            return (
                                <div
                                    key={item}
                                    className="flex justify-between"
                                >
                                    <div>
                                        <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                                        <p className="text-sm text-gray-600">Size: M</p>
                                    </div>
                                    <p className="text-gray-600">
                                        x3
                                    </p>
                                    <p className="text-gray-800 font-medium">$320</p>
                                </div>
                            )
                        })

                        }


                    </div>

                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
                        <p>{dictionary?.subtotal}</p>
                        <p>$1280</p>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
                        <p>{dictionary?.shipping}</p>
                        <p>{dictionary?.free}</p>
                    </div>

                    <div className="flex justify-between text-gray-800 font-medium py-3 uppercase">
                        <p className="font-semibold">{dictionary?.total}</p>
                        <p>$1280</p>
                    </div>

                    <div className="flex items-center mb-4 mt-2">
                        <input
                            type="checkbox"
                            name="agreement"
                            id="agreement"
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
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
                    </div>

                    <Link href="#"
                        className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">
                        Place order
                    </Link>
                </div>

            </div>
            {/* ./wrapper */}



        </>
    )
}

export default CheckoutPage
