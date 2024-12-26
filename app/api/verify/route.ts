import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    // Validate request body
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json(
        { error: "Missing required payment details", success: false },
        { status: 400 }
    );
    }

    // Verify Razorpay signature
    if (!process.env.RAZORPAY_KEY_SECRET) {
        throw new Error("RAZORPAY_KEY_SECRET environment variable is not defined");
    }
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

    if (expectedSignature !== razorpay_signature) {
    return NextResponse.json(
        { error: "Payment verification failed", success: false },
        { status: 401 }
    );
    }

    // Find the order in the database
    const purchase = await prisma.order.findUnique({
    where: { razorpayId: razorpay_order_id },
    });

    if (!purchase) {
    return NextResponse.json(
        { error: "Order not found", success: false },
        { status: 404 }
    );
    }

    // Update the order status to 'success'
    const updatedOrder = await prisma.order.update({
    where: { id: purchase.id },
    data: { status: "success" },
    });

    // Update the user by linking the order
    await prisma.user.update({
    where: { id: purchase.userId },
    data: {
        order: {
        connect: { id: purchase.id }, // Add the order ID to the `order` array
        },
        isPaid: true, // Optional: Update `isPaid` field if necessary
    },
    });

    // Return success response
    return NextResponse.json(
    { message: "Payment verified and user updated successfully", success: true,order:updatedOrder },
    { status: 200 }
    );
} catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
    { error: "An error occurred during payment verification", success: false },
    { status: 500 }
    );
} finally{
    await prisma.$disconnect
}
};
