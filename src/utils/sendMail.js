import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, html }) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;

    const port = Number(SMTP_PORT);

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465, // 465 true, 587 false
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: SMTP_FROM,
        to,
        subject,
        html,
    });
}
