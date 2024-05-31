import { removeFromWishlist } from "@/database/queries";


export const DELETE = async (request) => {
  try {

    const wishlistItemId = request.url?.split('/')?.[(request.url?.split('/'))?.length - 1];

    // Delete the item from the wishlist in the database
    const deleted = await removeFromWishlist(wishlistItemId);

    if (!deleted) {
      return new Response(JSON.stringify({
        isDeleted: false,
        message: "Item not found in wishlist"
      }), { status: 404 });
    }

    // Return success response
    return new Response(JSON.stringify({
      isDeleted: true,
      message: "Item deleted from wishlist successfully"
    }), {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  } catch (error) {
    console.error('Error deleting item from wishlist:', error);
    // Return generic error response
    return new Response("Internal Server Error", { status: 500 });
  }
};
