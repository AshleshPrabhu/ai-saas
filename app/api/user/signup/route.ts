import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
// import { sendEmail } from '@/helpers/mailer';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, password, email } = reqBody;
    if(!name || !password ||!email){
      return NextResponse.json({error:"please fill all fields",success:false },{status:200})
    }
    // console.log(reqBody);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists",success:false }, { status: 200 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);


    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // console.log(newUser);

    // await sendEmail({ email, emailType: "VERIFY", userId: newUser.id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser: newUser,
      }, { status: 201 });

  } catch (error: any) {
    // Handle any unexpected errors
    // console.log(error)
    return NextResponse.json({ error: error.message,success:false }, { status: 500 });
  }finally{
    await prisma.$disconnect()
  }
}
