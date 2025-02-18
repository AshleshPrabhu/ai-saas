import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const { password, email } = reqBody;
    if(!password||!email){
        return NextResponse.json({error: 'Please provide both password and email',success:false}, {status: 200});
    }
    // console.log(reqBody);

    // Fetch the user by email using Prisma
    const user = await prisma.user.findUnique({
    where: { email },
    });

    if (!user) {
    return NextResponse.json({ error: "User does not exist with given email",success:false }, { status: 200 });
    }

    // Validate password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
    return NextResponse.json({ error: "Incorrect Password",success:false }, { status: 200 });
    }

    // Generate token data
    const tokenData = {
    id: user.id,
    username: user.name,
    email: user.email,
    };

    // Generate JWT
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

    // Create response and set cookie
    const response = NextResponse.json({
        message: "Logged in successfully",
        success: true,
    },{status:201});
    response.cookies.set("token", token, {
    httpOnly: true,
    });

    return response;
} catch (error: any) {
    // console.log(error)
    return NextResponse.json({ error: error.message,success:false }, { status: 500 });
}finally{
    await prisma.$disconnect()
}
}