import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

// Subscribe email endpoint
export async function POST(request) {
    try {
        // Ensure database connection
        await ConnectDB();
        
        const formData = await request.formData();
        const email = formData.get('email')?.toString();

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" }, 
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Invalid email format" }, 
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingEmail = await EmailModel.findOne({ email });
        if (existingEmail) {
            return NextResponse.json(
                { success: false, message: "Email already subscribed" }, 
                { status: 409 }
            );
        }

        const emailData = { email };
        await EmailModel.create(emailData);
        
        return NextResponse.json({
            success: true, 
            message: "Email subscribed successfully"
        });
    } catch (error) {
        console.error("POST /api/email error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to subscribe email" }, 
            { status: 500 }
        );
    }
}

// Get all subscribed emails
export async function GET() {
    try {
        // Ensure database connection
        await ConnectDB();
        
        const emails = await EmailModel.find({}).sort({ date: -1 });
        return NextResponse.json({ success: true, emails });
    } catch (error) {
        console.error("GET /api/email error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch emails" }, 
            { status: 500 }
        );
    }
}

// Delete email subscription
export async function DELETE(request) {
    try {
        // Ensure database connection
        await ConnectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Email ID is required" }, 
                { status: 400 }
            );
        }

        const deletedEmail = await EmailModel.findByIdAndDelete(id);
        
        if (!deletedEmail) {
            return NextResponse.json(
                { success: false, message: "Email not found" }, 
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true, 
            message: "Email subscription deleted successfully"
        });
    } catch (error) {
        console.error("DELETE /api/email error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete email subscription" }, 
            { status: 500 }
        );
    }
}