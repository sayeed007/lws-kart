"use client"


import React from 'react';
// EXPECTED PROPS

// value=SELECTED NUMBER VALUE TO INCREASE OR DECREASE
// handleChangeValue= ACTION FUNCTION TO UPDATE VALUE
//  necessaryParametersForHandleFunction= IF YOU NEED TO PASS ANY PARAMETERS IN THE handleChangeValue FUNCTION (OPTIONAL) 
//                                        (ex: IF NEED TO PASS 2 PARAMETER NAMED id=1 and index=3, pass {id: 1, index: 3} object as this props value)(OPTIONAL)

const IncrementOrDecrement = (props) => {


    return (
        <>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                <div
                    className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                >
                    -
                </div>
                <div
                    className="h-8 w-8 text-base flex items-center justify-center"
                >
                    4
                </div>
                <div
                    className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                >
                    +
                </div>
            </div>
        </>
    )
}

export default IncrementOrDecrement