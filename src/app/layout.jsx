
import AuthProvider from "@/providers/AuthProvider";
import "../../public/assets/css/main.css";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ToastProvider from "@/providers/ToastProvider";



// const poppins = Poppins({ subsets: ["latin"] });

export const metadata = {
  title: "LWS-kart | Learn with Sumit",
  description: "Best Collection For Home Decoration",
};

export default async function RootLayout({ children }) {



  return (
    <html lang="en">


      <body>

        {/* PROVIDING TOAST POPUP CONTAINER */}
        <ToastProvider>

          {/* PROVIDING USER SESSION */}
          <SessionProvider>

            {/* PROVIDING MODIFIED AUTH FOR CART AND WISHLIST HANDLING */}
            <AuthProvider>
              <div id="modal-root"></div>

              {/*  Begin Main  */}
              <main>
                {children}
              </main>
            </AuthProvider>
          </SessionProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
