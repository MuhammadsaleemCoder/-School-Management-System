import nodemailer from "nodemailer";

const sendMailer = async ({ email, subject, message, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const mailOption = {
    from: process.env.MAIL_FROM,
    to: email,
    subject,
    text: message,
    html,
  };
  await transporter.sendMail(mailOption);
};

export default sendMailer;
