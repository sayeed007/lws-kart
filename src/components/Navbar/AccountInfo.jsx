import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const AccountInfo = ({ lang, dictionary }) => {

    const userId = '200001'

    return (
        <>
            <Link href={`/${lang}/account/${userId}`}
                className="flex justify-center items-center text-center text-gray-700 hover:text-primary transition relative  mx-3">
                <div className="text-2xl">
                    <FontAwesomeIcon
                        icon={faUser}
                        width={16}
                        height={16}
                        color={'#FD3D57'}
                    />
                </div>
                <div className="text-md mx-1 leading-3">
                    {dictionary?.account}
                </div>
            </Link>
        </>
    )
}

export default AccountInfo
