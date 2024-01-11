const nodemailer = require("nodemailer");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта`,
            text: '',
            html: 
                `
                    <div>
                        <h1>Для завершения регистрации нажмите на кнопку</h1>
                        <a 
                            href="${link}" 
                            style="border: 1px solid #4d7ffb; padding: 6px 12px; border-radius: 6px; text-decoration: none; background: #4d7ffb; color: #fff;"
                        >
                            Завершить регистрацию
                        </a>
                    </div>
                ` 
        })
    }
}

module.exports = new MailService();