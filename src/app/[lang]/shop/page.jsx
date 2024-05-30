import BreadCrumb from '@/components/Common/BreadCrumb';
import SingleProductCard from '@/components/Common/SingleProductCard';
import ShopSidebar from '@/components/ShopSidebar/ShopSidebar';
import SmallScreenFloatingFilter from '@/components/ShopSidebar/SmallScreenFloatingFilter';
import { getAllCategories, getAllColors, getAllProductsByFiltering, getAllSize } from '@/database/queries';
import { getDictionary } from '../../../../public/dictionary/dictionaries';

export async function generateMetadata({
    params: { lang },
    searchParams: { searchKeyWord, category, minPrice, maxPrice, size, color },
}) {

    const allCategory = await getAllCategories();
    const categoryMapping = {};
    allCategory.forEach(category => categoryMapping[category.name] = category.id);

    const allSizes = await getAllSize();
    const sizeMapping = {};
    allSizes.forEach(size => sizeMapping[size.visibleName] = size.id);

    const allColors = await getAllColors();
    const colorMapping = {};
    allColors.forEach(color => colorMapping[color.name] = color.id);


    const generatedCategoryName = category?.split('|');
    const generatedCategory = generatedCategoryName?.map(eachCategory => categoryMapping?.[eachCategory]
    );

    const generatedSize = sizeMapping?.[size];

    const generatedColor = colorMapping?.[color];

    const allProductsByFiltering = await getAllProductsByFiltering({
        searchKeyWord: searchKeyWord,
        category: generatedCategory,
        minPrice: minPrice,
        maxPrice: maxPrice,
        size: generatedSize,
        color: generatedColor,
    });

    // Generate product descriptions
    const productDescriptions = products.map(productInfo => {
        return `Product Name: ${productInfo.name}, Price: ${productInfo.price}, Available Count: ${productInfo.availableCount}`;
    });

    // Combine product descriptions into a single string
    const productListString = productDescriptions.join('\n');

    return {
        title: "LWS-kart | Learn with Sumit",
        description: `List of product - ${productListString}`,
    }
};


const ShopPage = async ({
    params: { lang },
    searchParams: { searchKeyWord, category, minPrice, maxPrice, size, color },
}) => {


    const dictionary = await getDictionary(lang);

    const allCategory = await getAllCategories();
    const categoryMapping = {};
    allCategory.forEach(category => categoryMapping[category.name] = category.id);

    const allSizes = await getAllSize();
    const sizeMapping = {};
    allSizes.forEach(size => sizeMapping[size.visibleName] = size.id);

    const allColors = await getAllColors();
    const colorMapping = {};
    allColors.forEach(color => colorMapping[color.name] = color.id);


    const generatedCategoryName = category?.split('|');
    const generatedCategory = generatedCategoryName?.map(eachCategory => categoryMapping?.[eachCategory]
    );

    const generatedSize = sizeMapping?.[size];

    const generatedColor = colorMapping?.[color];

    const allProductsByFiltering = await getAllProductsByFiltering({
        searchKeyWord: searchKeyWord,
        category: generatedCategory,
        minPrice: minPrice,
        maxPrice: maxPrice,
        size: generatedSize,
        color: generatedColor,
    });

    console.log(allProductsByFiltering);


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
                    allCategory={allCategory}
                    filterObject={{ searchKeyWord, category, minPrice, maxPrice, size, color }}
                />


                {/* sidebar */}
                <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
                    <ShopSidebar
                        dictionary={dictionary}
                        allCategory={allCategory}
                        allSizes={allSizes}
                        allColors={allColors}
                        filterObject={{
                            searchKeyWord: searchKeyWord,
                            category: category,
                            minPrice: minPrice,
                            maxPrice: maxPrice,
                            size: size,
                            color: color,
                        }}
                        mappingObject={{
                            categoryMapping: categoryMapping,
                            sizeMapping: sizeMapping,
                            colorMapping: colorMapping,
                        }}
                    />
                </div>




                {/* products */}
                <div className="col-span-3">
                    <div className='mb-4 font-bold'>
                        Showing Products {allProductsByFiltering?.length}/{allCategory?.reduce((sum, product) => sum + product?.totalProductCount, 0)}
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-6">

                        {allProductsByFiltering?.map((eachNewItem) => (
                            <SingleProductCard
                                key={eachNewItem?.name}
                                eachNewItem={eachNewItem}
                                dictionary={dictionary}
                                lang={lang}
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