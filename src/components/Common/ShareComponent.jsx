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


const ShareComponent = ({ productInfo }) => {

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
                quote={`LWS-KART : ${(JSON.parse(productInfo))?.name}`}
                hashtag={`Product-Details-of-${(JSON.parse(productInfo))?.name}`}
                className="socialMediaButton"
            >
                <FacebookIcon size={36} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
                url={currentURL}
                quote={`LWS-KART : ${(JSON.parse(productInfo))?.name}`}
                hashtag={`Product-Details-of-${(JSON.parse(productInfo))?.name}`}
                className="socialMediaButton"
            >
                <TwitterIcon size={36} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
                url={currentURL}
                quote={`LWS-KART : ${(JSON.parse(productInfo))?.name}`}
                hashtag={`Product-Details-of-${(JSON.parse(productInfo))?.name}`}
                className="socialMediaButton"
            >
                <WhatsappIcon size={36} round={true} />
            </WhatsappShareButton>

        </>
    );
};



export default ShareComponent