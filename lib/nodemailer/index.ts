"use server"
// Import necessary types and nodemailer for email sending functionality
import { EmailContent, EmailProductInfo, NotificationType } from '@/types';
import nodemailer from 'nodemailer';

// Define notification types as a constant object
const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
};

/**
 * Generates the email subject and body based on the product information and notification type.
 * @param {EmailProductInfo} product - The product information.
 * @param {NotificationType} type - The type of notification to generate the email for.
 * @returns {Promise<{subject: string, body: string}>} - The email subject and body.
 */
export async function generateEmailBody(
  product: EmailProductInfo,
  type: NotificationType
) {
  // Define a threshold percentage for discount notifications
  const THRESHOLD_PERCENTAGE = 40;
  
  // Shorten the product title if it's longer than 20 characters
  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}...`
      : product.title;

  // Initialize subject and body strings
  let subject = "";
  let body = "";

  // Generate the email subject and body based on the notification type
  switch (type) {
    case Notification.WELCOME:
      subject = `Welcome to Bargains Pro Price Tracking for ${shortenedTitle}`;
      body = `
        <div>
          <h2>Welcome to Bargains Pro 🚀</h2>
          <p>You are now tracking ${product.title}.</p>
          <p>Here's how you'll receive updates:</p>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>${product.title} is back in stock!</h3>
            <p>We're excited to let you know that ${product.title} is now back in stock.</p>
            <p>Don't miss out - <a href="${product.url}" target="_blank" rel="noopener noreferrer">buy it now</a>!</p>
          </div>
          <p>Stay tuned for more updates on ${product.title} and other products you're tracking.</p>
        </div>
      `;
      break;

    case Notification.CHANGE_OF_STOCK:
      subject = `${shortenedTitle} is now back in stock at Bargains Pro!`;
      body = `
        <div>
          <h4>Hey, ${product.title} is now restocked at Bargains Pro! Grab yours before they run out again!</h4>
          <p>See the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      break;

    case Notification.LOWEST_PRICE:
      subject = `Lowest Price Alert for ${shortenedTitle} at Bargains Pro`;
      body = `
        <div>
          <h4>Hey, ${product.title} has reached its lowest price ever at Bargains Pro!</h4>
          <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
        </div>
      `;
      break;

    case Notification.THRESHOLD_MET:
      subject = `Discount Alert: ${shortenedTitle} over ${THRESHOLD_PERCENTAGE}% off at Bargains Pro`;
      body = `
        <div>
          <h4>Hey, ${product.title} is now available at a discount of more than ${THRESHOLD_PERCENTAGE}% at Bargains Pro!</h4>
          <p>Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      break;

    default:
      throw new Error("Invalid notification type.");
  }

  // Return the generated email subject and body
  return { subject, body };
}

// Configure the email transporter using nodemailer
const transporter = nodemailer.createTransport({
  pool: true,
  service: 'hotmail',
  port: 587, // Correct port for secure SMTP
  secure: true, // Use TLS
  auth: {
    user: 'javascriptmastery@outlook.com',
    pass: process.env.EMAIL_PASSWORD, // Use environment variable for security
  },
  maxConnections: 1
});

/**
 * Sends an email to the specified recipients.
 * @param {EmailContent} emailContent - The content of the email to send.
 * @param {string[]} sendTo - The recipients of the email.
 */
export const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {
  // Define the email options
  const mailOptions = {
    from: 'javascriptmastery@outlook.com',
    to: sendTo.join(','), // Join array of recipients to a comma-separated string
    html: emailContent.body,
    subject: emailContent.subject,
  };

  // Send the email using the configured transporter
  transporter.sendMail(mailOptions, (error: any, info: { response: any; }) => {
    if (error) {
      return console.error(error);
    }
    console.log('Email sent: ', info.response);
  });
};
