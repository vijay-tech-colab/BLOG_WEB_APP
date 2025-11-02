// sendMail.js

import nodemailer from 'nodemailer';
import CustomErrorHandler from './errorHandler.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vijaykumar06232@gmail.com',
    pass: "nnhc ncou kemx ubvw" // Use an App Password (not your Gmail password)
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
