import { createOrder, sendOrderConfirmationEmail } from "@/database/queries";

export const POST = async (request) => {
  try {

    const requestData = await request.json();

    // Add productId to user's wishlist
    const createdOrderResponse = await createOrder(requestData);

    try {
      // Parameters(userId, userOrders, userAddress)
      // Send order confirmation email asynchronously
      const mailSent = await sendOrderConfirmationEmail(
        createdOrderResponse?.userId,
        createdOrderResponse?.userOrders,
        createdOrderResponse?.userAddress
      );

      // Email sent successfully, return response

      return new Response(JSON.stringify({
        message: 'Order created successfully',
        data: createdOrderResponse
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {

      console.error("Error sending order confirmation email:", error);
      // Even if email sending fails, return success response for order creation

      return new Response(JSON.stringify({
        message: 'Order created successfully, but failed to send confirmation email',
        data: createdOrderResponse
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error("Error creating new order:", error);

    return new Response(JSON.stringify({
      message: "Internal Server Error"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
