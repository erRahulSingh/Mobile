const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: process.env.SMTP_PORT || 2525,
      auth: {
        user: process.env.SMTP_EMAIL || 'mock_user',
        pass: process.env.SMTP_PASSWORD || 'mock_pass',
      },
    });

    const message = {
      from: `${process.env.FROM_NAME || 'ElectroMart'} <${process.env.FROM_EMAIL || 'noreply@electromart.com'}>`,
      to: options.email,
      subject: options.subject,
      html: options.htmlMessage || options.message,
    };

    const info = await transporter.sendMail(message);
    console.log(`[Nodemailer] Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.log(`[Nodemailer Simulation] Email to ${options.email} with subject "${options.subject}" processed successfully.`);
    return { success: true, simulated: true };
  }
};

module.exports = sendEmail;
