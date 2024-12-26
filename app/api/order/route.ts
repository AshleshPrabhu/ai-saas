import {  PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
// razorpayid,status,expiresat
import Razorpay from 'razorpay'
const razorpay = new Razorpay({
    key_id:"",
    key_secret:""
})

const prisma = new PrismaClient()
export const POST = async(request : NextRequest)=>{
    try {
        const {plan,amount,currency,userId} = await request.json();
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
            receipt: `receipt_${userId}`,
        };
    
        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create(options);
         // Calculate expiration (e.g., 30 days from now)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // Example: 30 days validity

        // Save order in the database
        const madeOrder = await prisma.order.create({
            data: {
                userId: userId,
                plan: plan,
                amount: amount,
                razorpayId: razorpayOrder.id,
                status: "pending", // Status can be updated after payment confirmation
                expiresAt: expiresAt,
            },
        });
        return NextResponse.json({message:"order created successfully",order:madeOrder,success:true},{status:200})
    } catch (error) {
        console.log("create order error",error)
        return NextResponse.json({error:"failed to create order",success:false},{status:500})
    }
}
