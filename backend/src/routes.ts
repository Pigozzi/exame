import { Router } from 'express';

import SessionController from './controllers/SessionController';
import UserController from './controllers/UsersController';

import QRCodeController from './controllers/QRCodeController';
import WhatsAppController from './controllers/WhatsAppController';

import EmailController from './controllers/EmailController';

const routes = Router();

const session = new SessionController();
const user = new UserController();
const whatsapp = new WhatsAppController();
const emailController = new EmailController();

const qrcode = new QRCodeController();

routes.post('/session', session.createSessionUser);
routes.post('/token', session.verifyToken)

routes.get('/sendEmail', emailController.sendEmail);
routes.get('/whatsapp', whatsapp.sendToken)

routes.get('/qrcode', qrcode.createQRCode)
routes.post('/qrcode', qrcode.verifyQRCode)

routes.get('/users', user.index);
routes.post('/create', user.create);

routes.get('/users/:id', user.show);
routes.put('/users/:id', user.update);

routes.delete('/delete/:id', user.delete);


export default routes;