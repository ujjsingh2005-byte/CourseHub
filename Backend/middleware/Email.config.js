import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();



const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: process.env.SMTP,
    pass: process.env.PASS,
  },
});








export const sendVerification = async (EmailId, verificationCode) => {
  try {
    await transporter.sendMail({
      from: `"CourseHub" <${process.env.SMTP}>`,
      to: EmailId,
      subject: "Verify your email",
      text: `Your One-Time Password (OTP) is ${verificationCode}. Please use this code to complete your verification. Do not share it with anyone.`,
      html: `
        <h2>Email Verification</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1>${verificationCode}</h1>
        <p>Please enter this code to complete your verification.</p>
        <p><em>Do not share this code with anyone.</em></p>
      `,
    });

    return true;
  } catch (error) {
    console.error("EMAIL VERIFICATION ERROR", error);
    return false;
  }
};









export const paymentCompleted = async(email,orderId,paymentId,CourseId) =>{

    try {
        const info = await transporter.sendMail({
    from: '',
    to: email,
    subject: "Payment Confirmation ",
    text: `Dear Student,

We are pleased to inform you that your payment has been successfully processed.  
Here are your payment and course enrollment details:

- Payment ID: ${paymentId}  
- Order ID: ${orderId}  
- Course ID: ${CourseId}  
- Course Name: ${CourseName}  

Your enrollment for the selected course has been confirmed. You now have full access to the course materials and assignments.  

If you have any questions or face any issues, please contact our support team at support@example.com.  

Thank you for choosing our platform to continue your learning journey. We wish you success in your studies!  

Best regards,  
Online Course Management Team
`
  });
    } catch (error) {
        console.log(error);
    }
}
