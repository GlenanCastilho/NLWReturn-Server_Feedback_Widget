import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e058a7ed8cd7bc",
      pass: "fe00ae87019245"
    }
  });

export class NodeMailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body}: SendMailData) {
        await transport.sendMail({
        from: 'Equipe  Feedget <oi@feedget.com>',
        to: 'Teste Teste <teste7@gmail.com>',
        subject,
        html: body,
    })
    };
}