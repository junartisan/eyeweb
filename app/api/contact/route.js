import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, company, projectType, budget, timeline, details, service } = body;

        // 1. Create a Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 2. Define Email Content
        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`, 
            to: process.env.RECEIVER_EMAIL,
            replyTo: body.email || process.env.SMTP_USER, // Add an email field to your form if you want to reply
            subject: `New Inquiry: ${service} from ${name}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                    <h2>New Project Inquiry</h2>
                    <p><strong>Service:</strong> ${service}</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Company:</strong> ${company || 'N/A'}</p>
                    <p><strong>Project Type:</strong> ${projectType}</p>
                    <p><strong>Budget:</strong> ${budget}</p>
                    <p><strong>Timeline:</strong> ${timeline}</p>
                    <hr />
                    <p><strong>Details:</strong></p>
                    <p>${details}</p>
                </div>
            `,
        };

        // 3. Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Success" }, { status: 200 });

    } catch (error) {
        console.error("SMTP Error:", error);
        return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
    }
}