import BreadCrumb from '@/components/Common/BreadCrumb';
import { getDictionary } from '../../../../../public/dictionary/dictionaries';
import ProductDetails from '@/components/Common/ProductDetails';
import ProductDescription from '@/components/Common/ProductDescription';
import RelatedProducts from '@/components/Common/RelatedProducts';
import { getSpecificProductWithAverageRatingAndReviewCount } from '@/database/queries';

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

        </>
    )
}

export default ProductDetailsPage
