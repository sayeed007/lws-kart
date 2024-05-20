import { getAllNewArrivalWithAverageRatingAndReviewCount } from '@/database/queries';
import SingleProductCard from '../Common/SingleProductCard';



const NewArrival = async ({ lang, dictionary }) => {

    const newArrivalItems = await getAllNewArrivalWithAverageRatingAndReviewCount();

    return (
        <>
            {/* new arrival */}
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    {dictionary?.topNewArrival}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {newArrivalItems?.map((eachNewItem) => (
                        <SingleProductCard
                            key={eachNewItem?.id}
                            eachNewItem={eachNewItem}
                            dictionary={dictionary}
                            lang={lang}
                        />
                    ))
                    }

                </div>
            </div>
            {/* new arrival */}
        </>
    )
}

export default NewArrival
