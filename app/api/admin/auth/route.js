import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { password } = await request.json();
        const adminPassword = process.env.ADMIN_PASSWORD ;
        
        if (password === adminPassword) {
            return NextResponse.json({
                success: true,
                message: "Authentication successful"
            });
        } else {
            return NextResponse.json(
                { success: false, message: "Invalid password" },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("Admin auth error:", error);
        return NextResponse.json(
            { success: false, message: "Authentication failed" },
            { status: 500 }
        );
    }
}
