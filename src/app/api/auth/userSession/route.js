import { getUserAccountByEmail } from "@/database/queries";
import { auth } from "../../../../../auth";

export const GET = async () => {
  try {
    // Authenticate user
    const session = await auth();

    // Fetch user account
    const userInfo = await getUserAccountByEmail(session?.user?.email);

    // If user account not found, return 404
    if (!userInfo) {
      return new Response("User account not found", { status: 404 });
    }

    // Return user data
    return new Response(JSON.stringify({
      sessionInfo: session,
      loggedInUserInfo: userInfo?.account,
      wishlistItems: userInfo.wishlistItems
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching user account by email:', error);
    // Return generic error response
    return new Response("Internal Server Error", { status: 500 });
  }
};
