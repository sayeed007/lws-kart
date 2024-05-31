import Ads from "@/components/Ads/Ads";
import Categories from "@/components/Categories/Categories";
import Features from "@/components/Features/Features";
import HeroBanner from "@/components/HeroSection/HeroBanner";
import NewArrival from "@/components/NewArrival/NewArrival";
import Product from "@/components/Product/Product";
import { getDictionary } from "../../../public/dictionary/dictionaries";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
  );
}
