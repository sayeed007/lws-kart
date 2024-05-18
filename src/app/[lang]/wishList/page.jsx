import BreadCrumb from '@/components/Common/BreadCrumb';
import SingleWishEdProduct from '@/components/WishList/SingleWishEdProduct';
import { getDictionary } from '../../../../public/dictionary/dictionaries';

const WishListPage = async ({ params: { lang } }) => {

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


                    {[1, 2, 3, 4]?.map((wishedProduct) => {
                        return (
                            <SingleWishEdProduct
                                dictionary={dictionary}
                                key={wishedProduct}
                            />
                        )
                    })
                    }

                </div>
                {/* wishlist */}

            </div>
            {/* wrapper */}




        </>
    )
}

export default WishListPage
