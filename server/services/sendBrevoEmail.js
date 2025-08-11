import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';
dotenv.config();

// Configure Brevo API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Create an instance of Brevo transactional email API
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Function to send email
const sendBrevoEmail = async (to, subject, text, html) => {
    try {
        const emailData = {
            to: [{ email: to }],
            sender: {
                name: "Your Service's Name",
                email: process.env.BREVO_EMAIL_USER
            },
            subject: subject,
            htmlContent: html || `<p>${text}</p>`
        };

        const response = await apiInstance.sendTransacEmail(emailData);
        console.log('✅ Email sent successfully:', response.messageId || response);
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'response' in error && typeof error.response === 'object' && error.response !== null && 'body' in error.response) {
            console.error('❌ Error sending email:', error.response.body);
        } else {
            console.error('❌ Error sending email:', error);
        }
    }
};

export default sendBrevoEmail;
