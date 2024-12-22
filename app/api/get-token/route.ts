import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload for decoded token type

export async function GET() {
try {
    // Retrieve cookies
    const cookieStore = await cookies(); // No need for `await` here; cookies() is synchronous
    const token = cookieStore.get('token')?.value; // Safely access token

    // Check if token exists
    if (!token) {
    return NextResponse.json({ error: 'Unauthorized: Token not found',success:false }, { status: 401 });
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload; // Use `!` because TOKEN_SECRET must be defined

    // Return decoded token
    return NextResponse.json({ decodedToken,success:true }, { status: 200 });
} catch (error) {
    // Handle token verification errors or other issues
    console.error('Error verifying token:', error);

    if (error instanceof jwt.JsonWebTokenError) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token',success:false }, { status: 401 });
    }

    return NextResponse.json({ error: 'Internal server error',success:false }, { status: 500 });
}
}
