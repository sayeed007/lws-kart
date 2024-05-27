"use client";


import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";

import { useEffect, useState } from "react";


const ShareComponent = ({ recipeInfo }) => {

    const [currentURL, setCurrentURL] = useState(null);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentURL(window.location.href);
        }
    }, []);


    return (
        <>

            <FacebookShareButton
                url={currentURL}
                quote={`Khana Khazana : ${recipeInfo?.name}`}
                hashtag={`Recipe-of-${recipeInfo?.name}`}
                className="socialMediaButton"
            >
                <FacebookIcon size={36} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
                url={currentURL}
                quote={`Khana Khazana : ${recipeInfo?.name}`}
                hashtag={`Recipe-of-${recipeInfo?.name}`}
                className="socialMediaButton"
            >
                <TwitterIcon size={36} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
                url={currentURL}
                quote={`Khana Khazana : ${recipeInfo?.name}`}
                hashtag={`Recipe-of-${recipeInfo?.name}`}
                className="socialMediaButton"
            >
                <WhatsappIcon size={36} round={true} />
            </WhatsappShareButton>

        </>
    );
};



export default ShareComponent