import { addToWishlist, removeFromWishlist } from "@/database/queries";

export const POST = async (request) => {
  try {
    // Get the session object
    // const session = await getSession(req);

    // Check if user is authenticated
    // if (!session) {
    //   return new Response(JSON.stringify({
    //     message: "Unauthorized"
    //   }), {
    //     status: 401,
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // }

    const requestData = await request.json();

    // Get productId from request body
    // const { productId } = req.body;

    // Add productId to user's wishlist
    const createdWishItem = await addToWishlist(requestData?.userId, requestData?.productId);

    return new Response(JSON.stringify(createdWishItem), {
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




// export const GET = async () => {
//   try {
//     // Authenticate user
//     const session = await auth();

//     // Fetch user account
//     const userInfo = await getUserAccountByEmail(session?.user?.email);

//     // If user account not found, return 404
//     // if (!userInfo) {
//     //   return new Response("User account not found", { status: 404 });
//     // }

//     // Return user data
//     return new Response(JSON.stringify({
//       sessionInfo: session,
//       loggedInUserInfo: userInfo?.account,
//       wishlistItems: userInfo.wishlistItems
//     }), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching user account by email:', error);
//     // Return generic error response
//     return new Response("Internal Server Error", { status: 500 });
//   }
// };
