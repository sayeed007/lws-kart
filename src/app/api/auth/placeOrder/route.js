import { createOrder } from "@/database/queries";

export const POST = async (request) => {
  try {

    const requestData = await request.json();

    // Add productId to user's wishlist
    const createdOrder = await createOrder(requestData);

    return new Response(JSON.stringify({
      message: 'Order created successfully',
      data: createdOrder
    }), {
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
