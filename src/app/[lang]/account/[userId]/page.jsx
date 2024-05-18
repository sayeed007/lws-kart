import PersonalInfo from "@/components/Account/PersonalInfo";
import ShippingAndBillingAddress from "@/components/Account/ShippingAndBillingAddress";
import BreadCrumb from "@/components/Common/BreadCrumb";
import { getDictionary } from "../../../../../public/dictionary/dictionaries";


const AccountPage = async ({ params: { lang, userId } }) => {

    const dictionary = await getDictionary(lang);

    console.log(userId);

    return (
        <>


            {/* breadcrumb */}
            <BreadCrumb
                lang={lang}
                route={dictionary?.account}
            />
            {/* breadcrumb */}



            {/* account wrapper */}
            <div className="container  items-start gap-6 pt-4 pb-16">

                {/* info */}
                <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">

                    {/* PERSONAL INFO */}
                    <PersonalInfo
                        lang={lang}
                        userId={userId}
                    />


                    {/* SHIPPING ADDRESS */}
                    <ShippingAndBillingAddress
                        lang={lang}
                        userId={userId}
                        type={'Shipping'}
                    />

                    {/* BILLING ADDRESS */}
                    <ShippingAndBillingAddress
                        lang={lang}
                        userId={userId}
                        type={'Billing'}
                    />

                </div>
                {/* ./info */}

            </div>
            {/* ./account wrapper */}




        </>
    )
}

export default AccountPage