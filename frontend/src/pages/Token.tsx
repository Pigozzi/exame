import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import '../styles/login.css';

function QRCode() {

    const [token, setToken] = useState('');

    const history = useHistory();

    const user_id = localStorage.getItem('id');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            await api.post('/token', { token }, {
                headers: {
                    Authorization: user_id
                }
            });

            alert('Token verificado com sucesso!');

            history.push('/panel')

        } catch (err) {
            alert('Token inválido')
        }

    }

    return (
        <main>
            <div className="container">
                <div className="full-height row align-items-center justify-content-center">
                    <div className="col-6">
                        <form id="page-login" onSubmit={handleSubmit}>
                            <fieldset className="text-center">
                                <h2>Informe o número da autenticação</h2>
                            </fieldset>
                            <div className="row text-center justify-content-center align-items-center">
                                <div className="col-8 input-block">
                                    <input
                                        type="text"
                                        id="token"
                                        value={token}
                                        onChange={event => setToken(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-4">
                                    <button className="confirm-button" type="submit">
                                        Verificar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default QRCode;