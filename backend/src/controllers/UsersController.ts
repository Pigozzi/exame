import { Request, Response } from 'express';

import knex from '../database/connection';
import moment from 'moment';

class UserController {

    async index(request: Request, response: Response) {

        const users = await knex('users').select('*')

        return response.json(users);
    }

    async create(request: Request, response: Response) {
        const { email, fullName, phone, passwordVerification, confirmPassword } = request.body;

        const verifyEmail = await knex('users')
            .select('email')
            .where('email', email)

        if (verifyEmail.length) {
            return response.status(409).json({ message: "Email already exists" });
        }

        const verifyPhone = await knex('users')
            .select('phone')
            .where('phone', phone)

        if (verifyPhone.length) {
            return response.status(409).json({ message: "Phone already exists" });
        }

        if (passwordVerification != confirmPassword) {
            return response.status(400).json({ message: "Passwords do not match" })
        };

        const password = passwordVerification;

        await knex('users').insert({
            email,
            fullName,
            phone,
            password
        });

        return response.status(200).json({ message: "Created successfuly" })
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const user_id = request.headers.authorization;

        if (id === user_id) {
            const user = await knex('users')
                .select('*')
                .where('id', id)

            return response.json(user);
        }

        return response.status(400).json({ message: "USER NOT FOUND" })

    }

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const user_id = request.headers.authorization;

        if (id === user_id) {
            const { fullName, email, phone } = request.body;

            const updated_at = moment().format('LLL');

            const user = { fullName, email, phone, updated_at };

            await knex('users').where('id', id).update(user);

            return response.status(200).json({ message: "User successfully updated" })
        }

        return response.status(400).json({ message: "USER NOT FOUND" })
    }


    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const user_id = request.headers.authorization;

        if (id === user_id) {
            await knex('users')
                .select('*')
                .where('id', id)
                .delete();

            return response.status(200).json({ message: "User successfully deleted" })
        }

        return response.status(400).json({ message: "USER NOT FOUND" })

    }


}

export default UserController;