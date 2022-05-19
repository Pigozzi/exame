import { Request, Response } from 'express';

import knex from '../database/connection';
import axios from 'axios';

class WhatsAppController {

    async sendToken(request: Request, response: Response) {

        try {
            const user_id = request.headers.authorization;

            if (!user_id) {
                return response.status(404).json({ error: "USER ID NOT FOUND" })
            }

            const phone = await knex('users')
                .select('phone')
                .where('id', user_id)

            const token = Math.floor(Math.random() * 100000 + 99999);

            const phoneVerify = phone[0].phone

            await axios.post(
                'https://api.z-api.io/instances/3AB9B618169E601D04BAFE0E2C9738F8/token/B7D2B00D13806F11C2405772/send-messages',
                {
                    "phone": `+55${phoneVerify}`,
                    "message": `Seu código de verificação é: ${token}`
                }
            ).then(() => {
                console.log('Mensagem enviada com sucesso!')
            }).catch(err => {
                console.log(err)
            })

            await knex('keys').insert({
                user_id,
                token
            });

            return response.json({ message: "Enviado com sucesso" })

        } catch (err) {
            return response.json({ message: "Não foi possivel enviar o token" })
        }
    }


}

export default WhatsAppController;