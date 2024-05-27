import React from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Image from 'next/image';




const ErrorTooltip = ({ content, origin }) => {

    return (
        <div style={{ cursor: 'pointer' }}>
            <Image
                src="https://icon-library.com/images/error-icon-transparent/error-icon-transparent-5.jpg"
                width={20}
                height={20}
                alt='Error Icon'
                // style={{ height: 20, width: 20, marginBottom: '10px' }}
                id={origin}
                data-tooltip-content={content} />
            <ReactTooltip anchorId={origin} />
        </div>
    )
}

export default ErrorTooltip
