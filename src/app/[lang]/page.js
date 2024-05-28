import Ads from "@/components/Ads/Ads";
import Categories from "@/components/Categories/Categories";
import Features from "@/components/Features/Features";
import HeroBanner from "@/components/HeroSection/HeroBanner";
import NewArrival from "@/components/NewArrival/NewArrival";
import Product from "@/components/Product/Product";
import { getDictionary } from "../../../public/dictionary/dictionaries";


export default async function HomePage({ params: { lang } }) {


  const dictionary = await getDictionary(lang);

  return (
    <>

      <HeroBanner
        lang={lang}
        dictionary={dictionary}
      />

      <Features
        dictionary={dictionary}
      />

      <Categories
        lang={lang}
        dictionary={dictionary}
      />

      <NewArrival
        lang={lang}
        dictionary={dictionary}
      />

      <Ads />

      <Product
        lang={lang}
        dictionary={dictionary}
      />

    </>
  );
}
