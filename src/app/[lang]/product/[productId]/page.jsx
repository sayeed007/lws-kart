import BreadCrumb from '@/components/Common/BreadCrumb';
import { getDictionary } from '../../../../../public/dictionary/dictionaries';
import ProductDetails from '@/components/Common/ProductDetails';
import ProductDescription from '@/components/Common/ProductDescription';
import RelatedProducts from '@/components/Common/RelatedProducts';
import { getSpecificProductWithAverageRatingAndReviewCount } from '@/database/queries';
import { ToastContainer } from 'react-toastify';


export async function generateMetadata({ params: { lang, productId } }) {

    const productInfo = await getSpecificProductWithAverageRatingAndReviewCount(productId);

    return {
        title: "LWS-kart | Learn with Sumit",
        description: `Details about the product - name: ${productInfo.name} , description: ${productInfo.description} , details: ${productInfo.details} , price: ${productInfo.price}`,
    }
};



const ProductDetailsPage = async ({ params: { lang, productId } }) => {
    const dictionary = await getDictionary(lang);

    const productInfo = await getSpecificProductWithAverageRatingAndReviewCount(productId);

    return (
        <>


            {/* breadcrumb */}
            <BreadCrumb
                lang={lang}
                route={dictionary?.product}
            />
            {/* breadcrumb */}


            {/* PRODUCT DETAILS */}
            <ProductDetails
                lang={lang}
                dictionary={dictionary}
                productInfo={productInfo}
            />


            {/* PRODUCT DESCRIPTION */}
            <ProductDescription
                dictionary={dictionary}
                productInfo={productInfo}
            />

            {/* RELATED PRODUCTS */}
            <RelatedProducts
                lang={lang}
                dictionary={dictionary}
                productInfo={productInfo}
            />



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

export default ProductDetailsPage
