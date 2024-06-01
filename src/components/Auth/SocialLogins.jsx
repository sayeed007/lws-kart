"use client";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialLogins = ({ mode, callbackUrl }) => {


  const handleAuthGoogle = (event) => {
    signIn("google", { callbackUrl: callbackUrl });
  };

  const handleAuthFacebook = (event) => {
    signIn("facebook", { callbackUrl: callbackUrl });
  };

  const handleAuthGithub = (event) => {
    signIn("github", { callbackUrl: callbackUrl });
  };


  return (
    <>

      {/* LOG IN WITH GITHUB */}
      <button
        onClick={handleAuthGithub}
        className="flex items-center justify-center w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">
        <FaGithub
          style={{ color: '#FFFFFF', fontSize: '28px' }}
        />
        <span className="mx-2">Github</span>
      </button>






      {/* LOG IN WITH GOOGLE */}
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
