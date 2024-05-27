import { addToUserAddress } from "@/database/queries";

export const POST = async (request) => {
  try {


    const requestData = await request.json();

    const userAddress = requestData?.userAddress;
    console.log(userAddress);

    // 
    const createdAddress = await addToUserAddress(userAddress);

    return new Response(JSON.stringify(createdAddress), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });


  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    return new Response(JSON.stringify({
      message: "Internal Server Error"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};




