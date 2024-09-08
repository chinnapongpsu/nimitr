import config from "config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "pro.turbo-smtp.com",
  port: 465,
  secure: true,
  pool: true,
  auth: {
    user: config.get("mail.user"),
    pass: config.get("mail.pass"),
  },
});

export default transporter;
