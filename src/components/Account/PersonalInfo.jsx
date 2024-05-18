import Link from 'next/link'
import React from 'react'

const PersonalInfo = ({ lang, userId, type }) => {
    return (
        <>
            <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                <div className="flex items-center justify-between mb-4">

                    <h3 className="font-medium text-gray-800 text-lg">
                        Personal Profile
                    </h3>

                    <Link
                        href={`/${lang}/account/${userId}/editPersonalProfile`}
                        className="text-primary">
                        Edit
                    </Link>

                </div>

                <div className="space-y-1">

                    <h4 className="text-gray-700 font-medium">
                        John Doe
                    </h4>

                    <p className="text-gray-800">
                        example@mail.com
                    </p>

                    <p className="text-gray-800">
                        0811 8877 988
                    </p>

                </div>
            </div>
        </>
    )
}

export default PersonalInfo
