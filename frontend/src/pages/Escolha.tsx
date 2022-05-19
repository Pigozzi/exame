import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import '../styles/login.css';

function Escolha() {

    const history = useHistory();

    const user_id = localStorage.getItem('id');

    async function sendEmail(event: FormEvent) {
        event.preventDefault();

        try {
            await api.get('/sendEmail', {
                headers: {
                    Authorization: user_id,
                }
            });

            alert('E-mail enviado com sucesso!')

            history.push('/token')

        } catch (err) {
            alert('Falha no envio de e-mail')
        }
    }

    async function sendWhatsApp(event: FormEvent) {
        event.preventDefault();

        try {
            await api.get('/whatsapp', {
                headers: {
                    Authorization: user_id,
                }
            });

            alert('WhatsApp enviado com sucesso!')

            history.push('/token')

        } catch (err) {
            alert('Falha no envio da mensagem')
        }
    }

    async function sendQRCode(event: FormEvent) {
        event.preventDefault();

        try {
            await api.get('/qrcode', {
                headers: {
                    Authorization: user_id,
                }
            });

            // history.push('/token')

        } catch (err) {
            alert('Falha ao gerar o QR Code')
        }
    }

    return (
        <main>
            <div className="container">
                <div className="full-height row align-items-center justify-content-center">
                    <div className="col-6">
                        <form id="page-login" onSubmit={() => { }}>
                            <fieldset className="text-center">
                                <h2>Autenticação de segunda etapa</h2>
                            </fieldset>
                            <div className="row text-center justify-content-center align-items-center">
                                <div className="col-4 input-block">
                                    <button className="confirm-button" onClick={sendEmail}>E-mail</button>
                                </div>
                                <div className="col-4 input-block">
                                    <button className="confirm-button" onClick={sendQRCode}>QRCode</button>
                                </div>
                                <div className="col-4 input-block">
                                    <button className="confirm-button" onClick={sendWhatsApp}>WhatsApp</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Escolha;