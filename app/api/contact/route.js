import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { name, company, projectType, budget, timeline, details, service } = await req.json();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: true, // Use true for Port 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            // Some shared hosts require this TLS setting
            tls: {
                rejectUnauthorized: false 
            }
        });

        const mailOptions = {
            // CRITICAL: The 'from' must usually be the same as the SMTP_USER 
            // for shared hosting servers to prevent spoofing filters.
            from: `"Inquiry Form" <${process.env.SMTP_USER}>`, 
            to: process.env.RECEIVER_EMAIL,
            replyTo: name ? name : process.env.SMTP_USER,
            subject: `New Project: ${service}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #db2777;">New Project Inquiry</h2>
                    <p><strong>Service:</strong> ${service}</p>
                    <p><strong>Client Name:</strong> ${name}</p>
                    <p><strong>Company:</strong> ${company}</p>
                    <p><strong>Budget:</strong> ${budget}</p>
                    <p><strong>Timeline:</strong> ${timeline}</p>
                    <p><strong>Project Type:</strong> ${projectType}</p>
                    <br />
                    <p><strong>Message Details:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #db2777;">
                        ${details}
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Inquiry sent successfully" }, { status: 200 });

    } catch (error) {
        console.error("Mail Error:", error);
        return NextResponse.json({ message: "Could not send email" }, { status: 500 });
    }
}