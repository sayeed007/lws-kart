import Image from 'next/image'
import Link from 'next/link'
import Offer from '../../../public/assets/images/offer.jpg'

const Ads = () => {
    return (
        <>
            {/* ads */}
            <div className="container pb-16">
                <Link href="#">
                    <Image
                        src={Offer}
                        alt="ads"
                        className="w-full"
                        height={3000}
                        width={3000}
                    />
                </Link>
            </div>
            {/* ./ads */}
        </>
    )
}

export default Ads
