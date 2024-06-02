import connectMongo from "@/service/connectMongo";

export async function generateMetadata() {
    return {
        title: "LWS-kart | Learn with Sumit",
        description: "Information about LWS_Kart",
    }
};




const AboutUsPage = async () => {
    await connectMongo();

    return (
        <>

            <div
                className='flex flex-col w-full min-h-[200px] justify-center items-center mt-6'
            >

                <div>
                    <iframe src="https://giphy.com/embed/3o7qE1YN7aBOFPRw8E" width="480" height="344" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
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

export default AboutUsPage
