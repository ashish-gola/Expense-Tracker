import nodemailer from 'nodemailer';

const sendmail = async ( email, subject, template ) => {
    try {
        if (!process.env.SENDER_EMAIL || !process.env.SENDER_PASSWORD) {
            throw new Error('Email credentials are not configured in environment variables');
        }

        const config = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD
            }
        });

        const options = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: subject,
            html: template
        };

        await config.sendMail(options);
        return true;

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error(error?.message || "Failed to send email");
    }
}

export default sendmail;