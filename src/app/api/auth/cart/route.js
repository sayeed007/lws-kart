import { addToCartList, getUserCart } from "@/database/queries";
import { auth } from "../../../../../auth";

export const POST = async (request) => {
  try {

    const requestData = await request.json();

    // Add productId to user's cart
    const cartItems = await addToCartList(requestData);

    return new Response(JSON.stringify(cartItems), {
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


export const GET = async (request) => {
  try {

    const session = await auth();

    const userId = session?.user?.id;

    // Delete the item from the cart in the database
    const getUserCartData = await getUserCart(userId);

    // Return success response
    return new Response(JSON.stringify(getUserCartData), {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  } catch (error) {
    console.error('Error getting item from cart:', error);
    // Return generic error response
    return new Response("Internal Server Error", { status: 500 });
  }
};
