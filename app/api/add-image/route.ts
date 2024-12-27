import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function POST(request:NextRequest) {
    try {
        const {userId,img} = await request.json()
        console.log(userId,img)
        if(!userId||!img){
            return NextResponse.json({error:"all fields are nessacery",success:false},{status:400})
        }
        // Fetch the current images array for the user
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            images: true
        }
    });
    
    if (!user) {
        throw new Error("User not found");
    }
    
    // Check if the image already exists in the array
    if (!user.images.includes(img)) {
        // Add the new image to the array
        const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            images: {
            set: [...user.images, img]
            }
        }
        });
    
        console.log("Image added:", updatedUser.images);
    } else {
        console.log("Image already exists in the array");
    }
    return NextResponse.json({success:true},{status:200})

    } catch (error) {
        console.log("add image error",error)
        return NextResponse.json({error:"failed to upload image",success:false},{status:500})
    } finally{
        await prisma.$disconnect()
    }
}