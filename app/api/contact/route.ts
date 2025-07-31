import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    console.log('Contact form submission received');
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error('Missing required fields:', { name, email, subject, message });
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email);
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Debug: Log environment variables (without sensitive data)
    console.log('Environment variables:', {
      GMAIL_USER: process.env.GMAIL_USER ? 'Set' : 'Not set',
      GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set',
      NODE_ENV: process.env.NODE_ENV || 'development'
    });

    // Check if environment variables are set
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing email configuration in environment variables');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Server configuration error: Missing email configuration',
          error: 'Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables'
        },
        { status: 500 }
      );
    }

    console.log('Creating transporter...');
    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify connection configuration
    try {
      await transporter.verify();
      console.log('Server is ready to take our messages');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('SMTP connection error:', errorMessage);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to establish email service connection',
          error: errorMessage
        },
        { status: 500 }
      );
    }

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Your Gmail address
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        You have received a new message from your website contact form.
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Contact Form Submission</h2>
          <p>You have received a new message from your website contact form.</p>
          
          <div style="background-color: #f8fafc; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-line;">${message}</p>
            </div>
          </div>
          
          <p style="margin-top: 1.5rem; color: #64748b; font-size: 0.875rem;">
            This message was sent from the contact form on your website.
          </p>
        </div>
      `,
    };

    // Send the email
    console.log('Sending email...');
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent:', info.messageId);
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

      return NextResponse.json(
        { 
          success: true, 
          message: 'Message sent successfully!',
          messageId: info.messageId
        },
        { status: 200 }
      );
    } catch (sendError) {
      const errorMessage = sendError instanceof Error ? sendError.message : 'Unknown error occurred';
      console.error('Error sending email:', errorMessage);
      
      // More specific error messages based on common issues
      let userMessage = 'Failed to send message. Please try again later.';
      if (errorMessage.includes('Invalid login')) {
        userMessage = 'Email authentication failed. Please check the email configuration.';
      } else if (errorMessage.includes('quota')) {
        userMessage = 'Email sending quota exceeded. Please try again later or contact support.';
      }
      
      return NextResponse.json(
        { 
          success: false, 
          message: userMessage,
          error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Unexpected error in contact API:', errorMessage);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
