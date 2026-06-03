const nodemailer = require("nodemailer");

let transporter = null;

const createTransporter = async () => {
  if (transporter) return transporter;

  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  console.log("📧 Ethereal account:", testAccount.user);
  return transporter;
};

module.exports = { createTransporter };