import nodemailer, { TransportOptions } from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, text: string) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: config.node_env === "production" ? true : false,
    port: 587,
    auth: {
      user: config.smtp_username,
      pass: config.smtp_password,
    },
  } as TransportOptions);

  await transport.sendMail({
    from: "mdakashkhanbdinto@gmail.com",
    to,
    subject: "Reset Your Password",
    text,
  });
};
