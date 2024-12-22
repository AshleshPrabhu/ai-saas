import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export const POST = async(request:NextRequest)=>{
    try {
        const {id} = await request.json()
        if(id===""){
            return new Response(JSON.stringify({error:"id is required",success:false}), {status:404})
        }
        const user = await prisma.user.findUnique({
            where:{id},
            include: {
                videos: true, 
            },
        })
        if(!user) 
            return NextResponse.json({error:"User not found",success:false}, {status:404})
        
        return NextResponse.json({user,message:"user found",success:true},{status:201})

    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message,success:false }, { status: 500 });
    }finally{
        await prisma.$disconnect()
    }
}