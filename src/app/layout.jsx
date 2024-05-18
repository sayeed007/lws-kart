
import "../../public/assets/css/main.css";
import "./globals.css";



// const poppins = Poppins({ subsets: ["latin"] });

export const metadata = {
  title: "LWS-kart | Learn with Sumit",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {



  return (
    <html lang="en">


      <body>
        <div id="modal-root" />

        {/*  Begin Main  */}
        <main>

          {children}

        </main>
      </body>
    </html>
  );
}
