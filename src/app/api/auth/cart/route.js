import { addToCartList, addToWishlist, removeFromWishlist } from "@/database/queries";

export const POST = async (request) => {
  try {

    const requestData = await request.json();
    console.log(requestData);

    // Add productId to user's cart
    const createdCartItem = await addToCartList(requestData);
    console.log(createdCartItem);

    return new Response(JSON.stringify(createdCartItem), {
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
