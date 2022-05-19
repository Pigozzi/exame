import UserController from "../controllers/UsersController"

describe('Submit new user', () => {

    jest.setTimeout(60000);
    it('Should be able to create a user', async () => {

        const response = new UserController();

        await expect(response.create({
            email: 'rafaelpigozzi@gmail.com',
            phone: "2132131",
            fullName: "Rafaele Pigozzi",
            passwordVerification: "123456",
            confirmPassword: "123456",
        }, {})).resolves.not.toThrow();
    });
})