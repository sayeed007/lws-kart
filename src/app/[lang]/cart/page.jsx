import CartContainer from '@/components/Cart/CartContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';
import connectMongo from "@/service/connectMongo";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getDictionary } from '../../../../public/dictionary/dictionaries';


export async function generateMetadata() {
    return {
        title: "LWS-kart | Learn with Sumit",
        description: `Product Cart Information of a user.`,
    }
};


const CartPage = async ({ params: { lang } }) => {
    await connectMongo();

    const dictionary = await getDictionary(lang);



    return (
        <>

            {/* breadcrumb */}
            <BreadCrumb
                lang={lang}
                route={dictionary?.cart}
            />
            {/* breadcrumb */}



            {/* wrapper */}
            <div className="container gap-6 pt-4 pb-16">

                {/* wishlist */}
                <div className="mx-auto space-y-4 max-w-6xl">

                    <CartContainer
                        lang={lang}
                        dictionary={dictionary}
                    />

                </div>
                {/* wishlist */}

            </div>
            {/* wrapper */}

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="colored"
            />


        </>
    )
}

export default CartPage
