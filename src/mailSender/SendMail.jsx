// sendMail.js

import nodemailer from 'nodemailer';

const email = process.env.EMAIL
const password = process.env.PASSWORD


const sendMail = async ({ to, subject, text, html }) => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            // host: 'smtp.example.com', // Your SMTP server host
            // port: 587, // Your SMTP server port
            // secure: false, // Set to true if your SMTP server requires secure connection
            service: 'gmail',
            auth: {
                user: email, // Your email address
                pass: password // Your email password
            }
        });

        // Send mail
        await transporter.sendMail({
            from: email, // Sender address
            to, // List of recipients
            subject, // Subject line
            text, // Plain text body
            html // HTML body
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendMail;
