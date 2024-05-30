export async function generateMetadata() {
    return {
        title: "LWS-kart | Learn with Sumit",
        description: "Contact Information for LWS_Kart",
    }
};


const ContactUsPage = () => {
    return (
        <>

            <div
                className='flex flex-col w-full min-h-[200px] justify-center items-center mt-6'
            >

                <div>
                    <iframe src="https://giphy.com/embed/3o7qE1YN7aBOFPRw8E" width="480" height="344" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>

                    {/* <p>
                        <a href="https://giphy.com/gifs/vr-bigblueboo-rescuties-3o7qE1YN7aBOFPRw8E">
                            via GIPHY
                        </a>
                    </p> */}
                </div>

                <div
                    className='mt-4 font-bold text-xl'
                >
                    This page is under maintenance
                </div>
            </div>
        </>
    )
}

export default ContactUsPage
