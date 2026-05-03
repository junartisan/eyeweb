import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        // 1. Parse the incoming request body
        const body = await req.json();
        
        const { 
            name, email, message,                                     // Basic Contact
            company, projectType, budget, timeline, details, service  // Service Inquiry
        } = body;

        // 2. Setup the SMTP Transporter
        // Using variables from your .env.local file
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_PORT === "587", // Use SSL for port 465, TLS for others
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 3. Determine which form template to use
        let emailSubject = "";
        let emailHtml = "";

        if (service) {
            // Template for Service Inquiry (from InquiryForm)
            emailSubject = `🚀 Project: ${service} - ${name}`;
            emailHtml = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #6366f1; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #6366f1; margin-top: 0;">New Project Inquiry</h2>
                    <p><strong>Service Requested:</strong> ${service}</p>
                    <p><strong>Client Name:</strong> ${name}</p>
                    <p><strong>Company:</strong> ${company || 'Not Specified'}</p>
                    <p><strong>Project Type:</strong> ${projectType}</p>
                    <p><strong>Budget Range:</strong> ${budget}</p>
                    <p><strong>Target Timeline:</strong> ${timeline}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Project Details:</strong></p>
                    <div style="background: #f4f4f9; padding: 15px; border-radius: 5px; border-left: 4px solid #6366f1;">
                        ${details.replace(/\n/g, '<br/>')}
                    </div>
                    <p style="font-size: 12px; color: #888; margin-top: 20px;">Sent from Eyewebmaster Portfolio</p>
                </div>
            `;
        } else {
            // Template for General Contact (from Contact component)
            emailSubject = `✉️ General Message: ${name}`;
            emailHtml = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #db2777; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #db2777; margin-top: 0;">New Message Received</h2>
                    <p><strong>From:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message Content:</strong></p>
                    <div style="background: #fff5f7; padding: 15px; border-radius: 5px; border-left: 4px solid #db2777;">
                        ${message.replace(/\n/g, '<br/>')}
                    </div>
                    <p style="font-size: 12px; color: #888; margin-top: 20px;">Sent from Eyewebmaster Portfolio</p>
                </div>
            `;
        }

        // 4. Send the email
        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`, 
            to: process.env.RECEIVER_EMAIL,
            replyTo: email || process.env.SMTP_USER, // Allows you to reply directly to the sender
            subject: emailSubject,
            html: emailHtml,
        });

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

    } catch (error) {
        console.error("Critical SMTP Error:", error);
        return NextResponse.json(
            { message: "Failed to process request", error: error.message }, 
            { status: 500 }
        );
    }
}