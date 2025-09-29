// sendMail.js

import nodemailer from 'nodemailer';
import CustomErrorHandler from './errorHandler.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD // Use an App Password (not your Gmail password)
  }
});

async function sendMail(options) {
  try {
    await transporter.sendMail(options);
  } catch (error) {
    throw new CustomErrorHandler(error.message, 500);
  }
}

export default sendMail;
