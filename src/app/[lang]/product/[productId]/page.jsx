import BreadCrumb from '@/components/Common/BreadCrumb';
import { getDictionary } from '../../../../../public/dictionary/dictionaries';
import ProductDetails from '@/components/Common/ProductDetails';
import ProductDescription from '@/components/Common/ProductDescription';
import RelatedProducts from '@/components/Common/RelatedProducts';

const ProductDetailsPage = async ({ params: { lang, productId } }) => {
    const dictionary = await getDictionary(lang);

    console.log(productId);

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
                dictionary={dictionary}
            />


            {/* PRODUCT DESCRIPTION */}
            <ProductDescription
                dictionary={dictionary}
            />

            {/* RELATED PRODUCTS */}
            <RelatedProducts
                dictionary={dictionary}
            />

        </>
    )
}

export default ProductDetailsPage
