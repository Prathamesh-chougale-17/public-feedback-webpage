import clientPromise from "@/mondoDB/mongo/clientPromise";
import { NextRequest, NextResponse } from "next/server";
import twilio from 'twilio';
//
export async function POST(req: NextRequest) {
    const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
    const token = <string>process.env.TWILIO_AUTH_TOKEN;
    const twilioServiceSid = <string>process.env.TWILIO_SERVICE_SID;
    const client = twilio(accountSid, token);
    const { message, number } = await req.json();
    try {
        client.messages
            .create({
                body: message,
                messagingServiceSid: twilioServiceSid,
                to: "+91" + number,
            })
        return NextResponse.json({ success: true ,status:200});
    } catch (error) {
        return NextResponse.json({ success: false, error, status: 500 })
    }
}