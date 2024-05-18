import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';

const BreadCrumb = ({ lang, route }) => {



    return (
        <>
            {/* breadcrumb */}
            <div className="container py-4 flex items-center gap-3">
                <Link
                    href={`/${lang}`}
                    className="text-primary text-base"
                >
                    <FontAwesomeIcon
                        icon={faHouse}
                        width={24}
                        height={24}
                        color={'#FD3D57'}
                    />
                </Link>


                <span className="text-sm text-gray-400">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        width={16}
                        height={16}
                        color={'#FD3D57'}
                    />
                </span>

                <p className="text-gray-600 text-lg font-bold">
                    {route}
                </p>
            </div>
            {/* ./breadcrumb */}
        </>
    )
}

export default BreadCrumb
