import { getUserByEmail } from "@/database/queries";
import { auth } from "../../../../../auth";

export const GET = async () => {
  try {
    // Authenticate user
    const session = await auth();

    // Fetch user info
    const userInfo = await getUserByEmail(session?.user?.email);

    // Return user data
    return new Response(JSON.stringify({
      userInfo: userInfo,
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
