// Use Nodemailer for email notifications (e.g., when analysis is complete)
// npm install nodemailer
import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text) => {
  try {
    // 1. Create a test account or use SMTP credentials
    /*
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"ACVAA System" <no-reply@acvaa.com>',
      to,
      subject,
      text,
    });
    */
    console.log(`[EMAIL MOCK] To: ${to} | Subject: ${subject} | Body: ${text}`);
  } catch (error) {
    console.error('Email sending failed:', error.message);
  }
};