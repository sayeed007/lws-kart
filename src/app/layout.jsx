
import AuthProvider from "@/providers/AuthProvider";
import "../../public/assets/css/main.css";
import "./globals.css";



// const poppins = Poppins({ subsets: ["latin"] });

export const metadata = {
  title: "LWS-kart | Learn with Sumit",
  description: "Best Collection For Home Decoration",
};

export default async function RootLayout({ children }) {



  return (
    <html lang="en">


      <body>
        <AuthProvider>
          <div id="modal-root"></div>

          {/*  Begin Main  */}
          <main>

            {children}

          </main>
        </AuthProvider>

      </body>
    </html>
  );
}
