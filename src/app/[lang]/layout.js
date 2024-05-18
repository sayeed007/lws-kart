import Copyright from '@/components/Copyright/Copyright';
import Footer from '@/components/Footer/Footer';
import PrimaryNavbar from "@/components/Navbar/PrimaryNavbar";
import SecondaryNavbar from "@/components/Navbar/SecondaryNavbar";
import { getDictionary } from '../../../public/dictionary/dictionaries';

import "../../../public/assets/css/main.css";
import "../globals.css";



export default async function RootLayout({ modal, children, params: { lang } }) {

  const dictionary = await getDictionary(lang);

  return (

    <>
      <PrimaryNavbar
        lang={lang}
        dictionary={dictionary}
      />

      <SecondaryNavbar
        lang={lang}
        dictionary={dictionary}
      />

      {modal}
      {children}

      <Footer
        dictionary={dictionary}
      />

      <Copyright
        dictionary={dictionary}
      />
    </>

  );
}
