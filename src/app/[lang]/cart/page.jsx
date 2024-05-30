import BreadCrumb from '@/components/Common/BreadCrumb';
import { getDictionary } from '../../../../public/dictionary/dictionaries';
import CartContainer from '@/components/Cart/CartContainer';



export async function generateMetadata() {
    return {
        title: "LWS-kart | Learn with Sumit",
        description: `Product Cart Information of a user.`,
    }
};


const CartPage = async ({ params: { lang } }) => {

    const dictionary = await getDictionary(lang);



    return (
        <>

            {/* breadcrumb */}
            <BreadCrumb
                lang={lang}
                route={dictionary?.wishList}
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




        </>
    )
}

export default CartPage
