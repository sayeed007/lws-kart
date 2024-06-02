import React from 'react';
import NoItem from '../../public/assets/icons/NoItem.svg';


const NotFound = (props) => {
    return (
        <div className='w-full h-screen flex flex-col items-center  justify-center my-4'>

            <NoItem
                // className="w-12 h-12"
                alt="not-found"
            />

            <div className='font-semibold text-2xl my-2 text-black'>
                {props?.message ?? "The page You are looking for is not available."}
            </div>

            <div className='my-4 text-black'>
                {props?.detailsMessage}
            </div>

        </div>
    );
}

export default NotFound;
