import { Request, Response } from 'express';

import knex from '../database/connection';

class SessionController {

    async createSessionUser(request: Request, response: Response) {

        const { email, password } = request.body;

        const user = await knex('users')
            .select('id')
            .select('fullName')
            .select('phone')
            .select('email')
            .where('email', email)
            .where('password', password)
            .first();

        if (!user) {
            return response.status(404).json({ error: "USER NOT FOUND" })
        }

        return response.json(user)
    }

    async verifyToken(request: Request, response: Response) {

        const user_id = request.headers.authorization;

        const { token } = request.body;

        if (!user_id) {
            return response.status(404).json({ error: "USER ID NOT FOUND" })
        }

        const verifyToken = await knex('keys')
            .select('id').orderBy('id', 'desc')
            .select('token')
            .where('user_id', user_id)
            .first()

        if (token === verifyToken.token) {

            return response.json({ message: "User authenticated successfully!" })
        }

        return response.status(404).json({ error: "TOKEN INVALID" })

    }

}

export default SessionController;