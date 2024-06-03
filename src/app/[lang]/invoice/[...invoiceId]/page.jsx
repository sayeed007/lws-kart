


import BreadCrumb from "@/components/Common/BreadCrumb";
import { getSpecificOrder } from "@/database/queries";
import { auth } from "../../../../../auth";
import { getDictionary } from "../../../../../public/dictionary/dictionaries";
import InvoiceComponent from "@/components/Account/InvoiceComponent";
import connectMongo from "@/service/connectMongo";

export async function generateMetadata() {
    return {
        title: "LWS-kart | Learn with Sumit",
        description: `Product Checkout Information of a user.`,
    }
};


const InvoicePage = async ({ params: { lang, invoiceId } }) => {
    await connectMongo();


    const dictionary = await getDictionary(lang);

    const session = await auth();

    if (!session) {
        redirect(`/${lang}`);
    };

    const orderDetails = await getSpecificOrder(invoiceId);

    return (
        <>
            {/* breadcrumb */}
            <BreadCrumb
                lang={lang}
                route={dictionary?.invoice}
            />
            {/* breadcrumb */}


            {/* wrapper */}
            <InvoiceComponent
                orderDetailsFromServer={JSON.stringify(orderDetails)}
                dictionary={dictionary}

            />




            {/* ./wrapper */}


        </>
    )
}

export default InvoicePage


