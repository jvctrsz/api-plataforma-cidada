import nodemailer from "nodemailer";

export const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } catch (error) {
    throw error;
  }
};
