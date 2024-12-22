import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
try {
    // Create a response with the "token" cookie cleared
    const response = NextResponse.json({
    message: "Logged out successfully",
    success: true,
    });

    // Clear the token cookie by setting it with an expired date
    response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // Set the cookie to expire immediately
    });

    return response;
} catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}
