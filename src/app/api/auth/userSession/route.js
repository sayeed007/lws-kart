import { getUserAccountByUserId } from "@/database/queries";
import { auth } from "../../../../../auth";

export const GET = async () => {
  try {
    // Authenticate user
    const session = await auth();

    // Fetch user account
    const userInfo = await getUserAccountByUserId(session?.user?._id ? session.user?._id : session?.user?.id);

    // Return user data
    return new Response(JSON.stringify({
      sessionInfo: {
        ...session,
        user: {
          ...session?.user,
          id: session?.user?._id ? session.user?._id : session?.user?.id
        }
      },
      wishlistItems: userInfo.wishlistItems,
      cartItems: userInfo.cartItems,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching user account by userId:', error);
    // Return generic error response
    return new Response("Internal Server Error", { status: 500 });
  }
};
