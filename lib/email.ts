import nodemailer from 'nodemailer';

// Enable debug logging
const debug = process.env.NODE_ENV !== 'production';
const log = (...args: any[]) => debug && console.log('[Email]', ...args);
const error = (...args: any[]) => console.error('[Email]', ...args);

// Validate required environment variables
function validateEmailConfig() {
  if (!process.env.GMAIL_USER) {
    error('GMAIL_USER is not set in environment variables');
    return false;
  }
  if (!process.env.GMAIL_APP_PASSWORD) {
    error('GMAIL_APP_PASSWORD is not set in environment variables');
    return false;
  }
  return true;
}

// Create transporter with error handling
let transporter: nodemailer.Transporter;
try {
  if (!validateEmailConfig()) {
    throw new Error('Email configuration is invalid');
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      // Allow self-signed certificates
      rejectUnauthorized: false
    }
  });

  // Verify connection configuration
  transporter.verify((err) => {
    if (err) {
      error('Error with email transporter:', err);
    } else {
      log('Email transporter is ready');
    }
  });
} catch (err) {
  error('Failed to create email transporter:', err);
  throw err;
}

export async function sendOTP(email: string, otp: string): Promise<boolean> {
  log(`Attempting to send OTP to ${email}`);
  
  if (!email || !otp) {
    error('Missing email or OTP');
    return false;
  }

  if (!transporter) {
    error('Email transporter is not initialized');
    return false;
  }

  try {
    const mailOptions = {
      from: `"Revoult Studio" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You have requested to reset your password. Use the following OTP to proceed:</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0; font-size: 24px; letter-spacing: 2px; color: #333;">
            ${otp}
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const info = await transporter.sendMail(mailOptions);
    log('Email sent successfully:', info.messageId);
    return true;
  } catch (err) {
    error('Error sending email:', err);
    return false;
  }
}

export function generateOTP(): string {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  log('Generated OTP:', otp);
  return otp;
}

// Export for testing
if (process.env.NODE_ENV === 'test') {
  module.exports = {
    ...module.exports,
    validateEmailConfig,
  };
}
