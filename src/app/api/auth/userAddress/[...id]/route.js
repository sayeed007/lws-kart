import { getUserAddress, updateUserAddress } from "@/database/queries";


export const GET = async (request) => {
  try {

    const userId = request.url?.split('/')?.[(request.url?.split('/'))?.length - 1];

    // 
    const userAddress = await getUserAddress(userId);

    return new Response(JSON.stringify(userAddress), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });


  } catch (error) {
    console.error("Error getting user address:", error);
    return new Response(JSON.stringify({
      message: "Internal Server Error"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};



export const PUT = async (request) => {
  try {

    const userAddressId = request.url?.split('/')?.[(request.url?.split('/'))?.length - 1];

    const requestData = await request.json();

    const modifiedAddress = requestData?.userAddress;
    console.log(modifiedAddress);

    // 
    const userAddress = await updateUserAddress(userAddressId, modifiedAddress);

    return new Response(JSON.stringify(userAddress), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });


  } catch (error) {
    console.error("Error getting user address:", error);
    return new Response(JSON.stringify({
      message: "Internal Server Error"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};


