import { Request, Response } from 'express';

import nodemailer from 'nodemailer';
import knex from '../database/connection';

class EmailController {

    async sendEmail(request: Request, response: Response) {

        try {
            const user_id = request.headers.authorization;

            if (!user_id) {
                return response.status(404).json({ error: "USER ID NOT FOUND" })
            }

            const email = await knex('users')
                .select('email')
                .select('fullName')
                .where('id', user_id)

            const emailVerify = email[0].email
            const nameVerify = email[0].fullName

            const transport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'test3.exame@gmail.com',
                    pass: '123456rafa',
                },
            });

            const token = Math.floor(Math.random() * 100000 + 99999);

            await transport.sendMail({
                to: `${nameVerify} <${emailVerify}>`,
                subject: "Autenticação",
                html: [
                    `<div style="font-family: sans-serif; font-size: 16px; colors: #111;">`,
                    `<p> Olá, seja bem vindo!</p>`,
                    `<p>Sua chave secreta é: ${token}</p>`,
                    `</div>`
                ].join('\n')
            })

            await knex('keys').insert({
                user_id,
                token
            });

            return response.status(201).json({ message: "E-mail enviado com sucesso!" });
        } catch (err) {
            return response.json({ message: "Não foi possivel enviar o e-mail" })
        }

    }

}

export default EmailController;