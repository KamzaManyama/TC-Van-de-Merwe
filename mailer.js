// ================================================
// TC Van de Merwe Logistics — Contact Mailer
// Node.js + Express + Nodemailer (Gmail)
// ================================================

require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://127.0.0.1:5502'
}));

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.RECIPIENT_EMAIL) {
    console.error('Missing environment variables. Check your .env file.');
}

// Gmail transporter via App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

console.log("ENV TEST", process.env.GMAIL_USER, process.env.GMAIL_APP_PASSWORD, process.env.RECIPIENT_EMAIL);


transporter.verify(function (error, success) {
    if (error) {
        console.error('❌ Gmail connection error:', error);
    } else {
        console.log('✅ Gmail server is ready to send messages');
    }
});


app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    const mailOptions = {
        from: `"TC Van de Merwe Website" <${process.env.GMAIL_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        replyTo: email,
        subject: `New Contact Enquiry from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 30px; border-radius: 4px;">
                <h2 style="color: #1a1a1a; border-bottom: 2px solid #d97706; padding-bottom: 10px;">
                    New Enquiry — TC Van de Merwe Logistics
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                        <td style="padding: 10px; background: #f9f9f9; font-weight: bold; width: 30%;">Name</td>
                        <td style="padding: 10px;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">Email</td>
                        <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; background: #f9f9f9; font-weight: bold;">Phone</td>
                        <td style="padding: 10px;">${phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; background: #f9f9f9; font-weight: bold; vertical-align: top;">Message</td>
                        <td style="padding: 10px; white-space: pre-line;">${message}</td>
                    </tr>
                </table>
                <p style="margin-top: 30px; font-size: 12px; color: #999;">
                    Sent via the TC Van de Merwe Logistics website contact form.
                </p>
            </div>
        `
    };

    const autoReplyOptions = {
        from: `"TC Van de Merwe Logistics" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Thank you for contacting TC Van de Merwe Logistics',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 30px; border-radius: 4px;">
                <h2 style="color: #1a1a1a;">Thank you, ${name}!</h2>
                <p>We have received your enquiry and will be in touch shortly.</p>
                <p>Our team operates Monday–Friday 07:00–18:00 and Saturday 08:00–14:00.</p>
                <p style="margin-top: 30px; font-size: 13px; color: #555;">
                    TC Van de Merwe Logistics (Pty) Ltd<br>
                    Midrand Glen, Gauteng, South Africa<br>
                    info@tcvdmlogistics.co.za
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(autoReplyOptions);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully.'
        });

    } catch (err) {
        console.error('Mailer error:', err);
        res.status(500).json({
            error: 'Failed to send email. Please try again later.'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`TC Van de Merwe Mailer running on port ${PORT}`);
});