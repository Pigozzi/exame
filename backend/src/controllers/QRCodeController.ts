import { Request, Response } from 'express';

import knex from '../database/connection';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

const secret = speakeasy.generateSecret()

class QRCodeController {

    async createQRCode(request: Request, response: Response) {

        const user_id = request.headers.authorization;

        if (!user_id) {
            return response.status(404).json({ error: "USER ID NOT FOUND" })
        }

        await knex('users')
            .select('id')
            .where('id', user_id)

        QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
            return response.send(
                `
                <h3> Utilize o QR Code para se autenticar! </h3>
                <img src=${data_url}><br>
                <span>Seu token expira em 30 segundos!</span> 
                `
            )
        })
    }

    async verifyQRCode(request: Request, response: Response) {

        const user_id = request.headers.authorization;

        if (!user_id) {
            return response.status(404).json({ error: "USER ID NOT FOUND" })
        }

        await knex('users')
            .select('*')
            .where('id', user_id)

        const token = request.body.userToken;

        const verified = speakeasy.totp.verify({
            secret: secret.base32,
            encoding: 'base32',
            token: token,
        });

        if (!verified) {
            return response.status(404).json({ error: "SECRET KEY NOT FOUND" })
        }

        response.json({ success: verified })
    }


}

export default QRCodeController;
