import { getUserCart, removeFromCartList } from "@/database/queries";


export const DELETE = async (request) => {
  try {

    const cartItemId = request.url?.split('/')?.[(request.url?.split('/'))?.length - 1];

    // Delete the item from the cart in the database
    const deleted = await removeFromCartList(cartItemId);
    console.log(deleted);

    if (!deleted) {
      return new Response(JSON.stringify({
        isDeleted: false,
        message: "Item not found in cart"
      }), { status: 404 });
    }

    // Return success response
    return new Response(JSON.stringify({
      isDeleted: true,
      message: "Item deleted from cart successfully"
    }), {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    // Return generic error response
    return new Response("Internal Server Error", { status: 500 });
  }
};



export const GET = async (request) => {
  try {

    const userId = request.url?.split('/')?.[(request.url?.split('/'))?.length - 1];

    console.log(userId);

    // Delete the item from the cart in the database
    const getUserCartData = await getUserCart(userId);
    console.log(getUserCartData);

    // Return success response
    return new Response(JSON.stringify(getUserCartData), {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    // Return generic error response
    return new Response("Internal Server Error", { status: 500 });
  }
};
