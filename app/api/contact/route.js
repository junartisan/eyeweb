import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const body = await req.json();
        
        const { 
            name, email, message,
            company, projectType, budget, timeline, details, service 
        } = body;

        // 1. IMPROVED TRANSPORTER CONFIGURATION
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            // Render/Cloud hosts prefer port 587 with secure: false (it uses STARTTLS)
            secure: process.env.SMTP_PORT === "587", 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            // CRITICAL FOR CLOUD HOSTS: Bypass self-signed certificate issues 
            // and force the connection to wait for a handshake.
            tls: {
                rejectUnauthorized: false,
                minVersion: "TLSv1.2"
            },
            connectionTimeout: 10000, // 10 seconds timeout
        });

        // 2. Logic to Determine Email Content (Remains same as your working logic)
        let emailSubject = "";
        let emailHtml = "";

        if (service) {
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
                        ${(details || "").replace(/\n/g, '<br/>')}
                    </div>
                </div>
            `;
        } else {
            emailSubject = `✉️ General Message: ${name}`;
            emailHtml = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #db2777; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #db2777; margin-top: 0;">New Message Received</h2>
                    <p><strong>From:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message Content:</strong></p>
                    <div style="background: #fff5f7; padding: 15px; border-radius: 5px; border-left: 4px solid #db2777;">
                        ${(message || "").replace(/\n/g, '<br/>')}
                    </div>
                </div>
            `;
        }

        // 3. SEND THE EMAIL
        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`, 
            to: process.env.RECEIVER_EMAIL,
            replyTo: email || process.env.SMTP_USER, 
            subject: emailSubject,
            html: emailHtml,
        });

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

    } catch (error) {
        // Detailed logging for Render logs
        console.error("SMTP Error Details:", {
            code: error.code,
            command: error.command,
            response: error.response,
            stack: error.stack
        });

        return NextResponse.json(
            { message: "Failed to send email", error: error.message }, 
            { status: 500 }
        );
    }
}