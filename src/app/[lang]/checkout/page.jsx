import CheckoutForm from "@/components/Checkout/CheckoutForm";
import BreadCrumb from "@/components/Common/BreadCrumb";
import connectMongo from "@/service/connectMongo";
import { redirect } from 'next/navigation';
import { auth } from "../../../../auth";
import { getDictionary } from "../../../../public/dictionary/dictionaries";


export async function generateMetadata() {
    return {
        title: "LWS-kart | Learn with Sumit",
        description: `Product Checkout Information of a user.`,
    }
};


const CheckoutPage = async ({ params: { lang } }) => {
    await connectMongo();

    const dictionary = await getDictionary(lang);

    const session = await auth();

    if (!session) {
        redirect(`/${lang}`);
    };

    return (
        <>
            {/* breadcrumb */}
            <BreadCrumb
                lang={lang}
                route={dictionary?.checkout}
            />
            {/* breadcrumb */}


            {/* wrapper */}

            <CheckoutForm
                lang={lang}
                dictionary={dictionary}
            />

            {/* ./wrapper */}



        </>
    )
}

export default CheckoutPage




// < div className = "space-y-4" >

//     {/* NAME */ }
//     < div className = "grid grid-cols-2 gap-4" >

//                         <div>
//                             <label
//                                 htmlFor="first-name"
//                                 className="text-gray-600">
//                                 {dictionary?.firstName}
//                                 <span className="text-primary mx-1">*</span>
//                             </label>

//                             <input
//                                 type="text"
//                                 name="first-name"
//                                 id="first-name"
//                                 className="input-box"
//                             />
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="last-name"
//                                 className="text-gray-600">
//                                 {dictionary?.lastName}
//                                 <span className="text-primary mx-1">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 name="last-name"
//                                 id="last-name"
//                                 className="input-box"
//                             />
//                         </div>

//                     </ >

// {/* COMPANY */ }
// < div >
//                         <label
//                             htmlFor="company"
//                             className="text-gray-600">
//                             {dictionary?.company}
//                         </label>
//                         <input
//                             type="text"
//                             name="company"
//                             id="company"
//                             className="input-box"
//                         />
//                     </ >

// {/* COUNTRY */ }
// < div >
//                         <label
//                             htmlFor="region"
//                             className="text-gray-600">
//                             {dictionary?.country}
//                         </label>
//                         <input
//                             type="text"
//                             name="region"
//                             id="region"
//                             className="input-box"
//                         />
//                     </ >

// {/* STREET */ }
// < div >
//                         <label
//                             htmlFor="address"
//                             className="text-gray-600">
//                             {dictionary?.street}
//                         </label>
//                         <input
//                             type="text"
//                             name="address"
//                             id="address"
//                             className="input-box"
//                         />
//                     </ >

// {/* CITY */ }
// < div >
//                         <label
//                             htmlFor="city"
//                             className="text-gray-600">
//                             {dictionary?.city}
//                         </label>
//                         <input
//                             type="text"
//                             name="city"
//                             id="city"
//                             className="input-box"
//                         />
//                     </ >

// {/* PHONE NUMBER */ }
// < div >
//                         <label
//                             htmlFor="phone"
//                             className="text-gray-600">
//                             {dictionary?.phone}
//                         </label>
//                         <input
//                             type="text"
//                             name="phone"
//                             id="phone"
//                             className="input-box"
//                         />
//                     </ >

// {/* Email Address */ }
// < div >
//                         <label
//                             htmlFor="email"
//                             className="text-gray-600">
//                             {dictionary?.email}
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             id="email"
//                             className="input-box"
//                         />
//                     </ >

//                 </div >
