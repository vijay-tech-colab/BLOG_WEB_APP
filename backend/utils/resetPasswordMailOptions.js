export function resetPasswordMailOptions(toEmail, resetToken) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  return {
    from: 'vijaykumar06232@gmail.com',
    to: toEmail,
    subject: 'Reset Your Password',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none;">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `
  };
}


