"use client"


import React from 'react';

const IncrementOrDecrement = (props) => {


    return (
        <>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">

                {/* DECREMENT */}
                <div
                    className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                    onClick={() => props.setValue(value => value - 1)}
                >
                    -
                </div>

                {/* Value */}
                <div
                    className="h-8 w-18 text-base flex items-center justify-center"
                >
                    <input
                        className="h-8 w-16 text-base flex items-center justify-center"
                        type="number"
                        min={0}
                        value={props?.value}

                        onChange={(e) => props.setValue(value => e?.target?.value)}
                    />
                </div>

                {/* INCREMENT */}
                <div
                    className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                    onClick={() => props.setValue(value => value + 1)}
                >
                    +
                </div>
            </div>
        </>
    )
}

export default IncrementOrDecrement