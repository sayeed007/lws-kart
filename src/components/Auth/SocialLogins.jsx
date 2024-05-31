"use client";
import { signIn } from "next-auth/react";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";

const SocialLogins = ({ mode }) => {

  const handleAuthGoogle = (event) => {
    signIn("google", { callbackUrl: 'http://localhost:3000' });
  };

  const handleAuthFacebook = (event) => {
    signIn("facebook", { callbackUrl: 'http://localhost:3000' });
  };


  return (
    <>

      <button
        onClick={handleAuthGoogle}
        className="flex items-center justify-center w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">
        <FaGoogle
          style={{ color: '#FFFFFF', fontSize: '28px' }}
        />
        <span className="mx-2">Google</span>
      </button>

    </>
  );
};

export default SocialLogins;
