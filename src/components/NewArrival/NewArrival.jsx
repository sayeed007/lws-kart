import { getAllNewArrivalWithAverageRatingAndReviewCount } from '@/database/queries';
import SingleProductCard from '../Common/SingleProductCard';
import ItemNotFound from '../../../public/assets/icons/ItemNotFound.svg'


const NewArrival = async ({ lang, dictionary }) => {

    const newArrivalItems = await getAllNewArrivalWithAverageRatingAndReviewCount();

    return (
        <>
            {/* new arrival */}
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    {dictionary?.topNewArrival}
                </h2>

                {newArrivalItems?.length > 0 ?
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
                    :
                    <div className='flex flex-col w-full justify-center items-center'>
                        <ItemNotFound
                            alt="No Product has newly arrived."
                            width={600}
                            height={300}
                        />
                        <div className='font-bold'>
                            {dictionary?.noNewProductArrived}
                        </div>
                    </div>
                }

            </div>
            {/* new arrival */}
        </>
    )
}

export default NewArrival
