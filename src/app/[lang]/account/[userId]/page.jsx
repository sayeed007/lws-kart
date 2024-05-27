import PersonalInfo from "@/components/Account/PersonalInfo";
import UserAddress from "@/components/Account/UserAddress";
import BreadCrumb from "@/components/Common/BreadCrumb";
import { getUserAddress } from "@/database/queries";
import { getDictionary } from "../../../../../public/dictionary/dictionaries";


const AccountPage = async ({ params: { lang, userId } }) => {

    const dictionary = await getDictionary(lang);

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