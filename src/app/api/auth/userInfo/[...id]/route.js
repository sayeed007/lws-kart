import { updateUserInfo } from "@/database/queries";


export const PUT = async (request) => {
  try {

    const userId = request.url?.split('/')?.[(request.url?.split('/'))?.length - 1];

    const requestData = await request.json();

    const userData = requestData?.userData;

    //
    const modifiedUserInfo = await updateUserInfo(userId, userData);

    return new Response(JSON.stringify(modifiedUserInfo), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });


  } catch (error) {
    console.error("Error updating user personal information:", error);
    return new Response(JSON.stringify({
      message: error
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};



