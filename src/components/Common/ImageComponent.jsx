'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react'

const ImageComponent = ({ rootProductInfo }) => {

    const [productInfo, setProductInfo] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        if (rootProductInfo) {
            setProductInfo(JSON.parse(rootProductInfo));
        }

    }, [rootProductInfo])


    useEffect(() => {
        if (productInfo?.images?.[0]) {
            setSelectedImage(productInfo?.images?.[0]);
        }

    }, [productInfo?.images]);


    return (
        <>


            <div>

                {selectedImage &&
                    <Image
                        src={selectedImage}
                        alt="product"
                        className="w-full"
                        width={1000}
                        height={1000}
                    />

                }

                <div className="grid grid-cols-5 gap-4 mt-4">

                    {productInfo?.images?.length > 0 &&
                        productInfo?.images?.map((image) => {
                            return (
                                <div
                                    key={image}
                                    onClick={() => setSelectedImage(image)}
                                    className={`${image === selectedImage && 'border-2 border-solid border-red-500 p-2 rounded'}`}
                                >
                                    <Image
                                        src={image}
                                        alt={image}
                                        className="w-full cursor-pointer border border-primary"
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                            )
                        })

                    }


                </div>
            </div>


        </>
    )
}

export default ImageComponent
