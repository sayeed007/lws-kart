import SingleProductCard from '@/components/Common/SingleProductCard';
import ShopSidebar from '@/components/ShopSidebar/ShopSidebar';
import SmallScreenFloatingFilter from '@/components/ShopSidebar/SmallScreenFloatingFilter';
import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { getDictionary } from '../../../../public/dictionary/dictionaries';
import BreadCrumb from '@/components/Common/BreadCrumb';


const trendingProducts = [
    {
        name: 'Guyer Chair',
        image: 'Product1',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    },
    {
        name: 'BED KING SIZE',
        image: 'Product2',
        oldPrice: 71.00,
        newPrice: 25.00,
        rating: 2.2,
        totalGivenRating: 140
    },
    {
        name: 'BED KING SIZE',
        image: 'Product3',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    },
    {
        name: 'MATTRASS X',
        image: 'Product4',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    },
    {
        name: 'Guyer Chair',
        image: 'Product1',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    },
    {
        name: 'BED KING SIZE',
        image: 'Product2',
        oldPrice: 71.00,
        newPrice: 25.00,
        rating: 2.2,
        totalGivenRating: 140
    },
    {
        name: 'BED KING SIZE',
        image: 'Product3',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    },
    {
        name: 'MATTRASS X',
        image: 'Product4',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    }


];


const ShopPage = async ({ params: { lang } }) => {

    const dictionary = await getDictionary(lang);

    return (
        <>

            {/* breadcrumb */}
            <BreadCrumb
                lang={lang}
                route={dictionary?.shop}
            />
            {/* ./breadcrumb */}


            {/* shop wrapper */}
            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                {/* sidebar */}


                <SmallScreenFloatingFilter
                    dictionary={dictionary}
                />


                {/* sidebar */}
                <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
                    <ShopSidebar
                        dictionary={dictionary}
                    />
                </div>

                {/* products */}
                <div className="col-span-3">
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-6">

                        {trendingProducts?.map((eachNewItem) => (
                            <SingleProductCard
                                key={eachNewItem?.name}
                                eachNewItem={eachNewItem}
                                dictionary={dictionary}
                            />
                        ))
                        }
                    </div>
                </div>

                {/* products */}

            </div>
            {/* shop wrapper */}

        </>
    )
}

export default ShopPage