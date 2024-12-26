import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID!,
    key_secret: process.env.KEY_SECRET!,
});

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
    try {
        const { plan, amount, currency, userId } = await request.json();
        console.log({ plan, amount, currency, userId });

        if (!plan || !amount || !currency || !userId) {
            return NextResponse.json(
                { error: "Missing required fields", success: false },
                { status: 400 }
            );
        }

        // Razorpay order options
        const options = {
            amount: amount * 100, // Razorpay expects the amount in paise
            currency: currency,
            receipt: `ok${userId}`,
        };
        console.log("Creating Razorpay order...");
        let razorpayOrder;
        try {
            razorpayOrder = await razorpay.orders.create(options);
        } catch (razorpayError) {
            console.error("Razorpay order creation error:", razorpayError);
            return NextResponse.json(
                { error: "Failed to create Razorpay order", success: false },
                { status: 500 }
            );
        }

        console.log("Razorpay order created:", razorpayOrder);

        // Calculate expiration (e.g., 30 days from now)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // Example: 30 days validity
        console.log("Calculated expiration:", expiresAt);

        // Check if the plan is valid
        const validPlans = ['free', 'fullpremium', 'onepremium'];
        if (!validPlans.includes(plan)) {
            return NextResponse.json(
                { error: "Invalid plan type", success: false },
                { status: 400 }
            );
        }

        // Save order in the database
        const madeOrder = await prisma.order.create({
            data: {
                userId: userId,
                plan: plan as any,  // Typecast to ensure valid enum values
                amount: amount,
                razorpayId: razorpayOrder.id,
                status: "pending", // Default status
                expiresAt: expiresAt,
            },
        });
        console.log("Order saved to database:", madeOrder);

        return NextResponse.json(
            { message: "Order created successfully", order: madeOrder, success: true },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Create order error:", error);
        return NextResponse.json({ error: "Failed to create order", success: false }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Ensure proper disconnection from Prisma
    }
};
