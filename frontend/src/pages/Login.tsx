import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../services/api';

import '../styles/login.css';

function Login() {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const data = {
                email,
                password
            }

            const response = await api.post('/session', data);

            localStorage.setItem('id', response.data.id);
   
            alert('Logado com sucesso!');

            history.push('/options');
            
        } catch (err) {
            alert('Usuário ou senha inválidos')
        }

    }

    return (
        <main>
            <div className="container">
                <div className="full-height row align-items-center justify-content-center">
                    <div className="col-6">
                        <form id="page-login" onSubmit={handleSubmit}>
                            <fieldset className="text-center">
                                <h2>Acessar o Exame</h2>
                            </fieldset>
                            <div className="input-block">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="password">Senha</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <button className="confirm-button mb-3" type="submit">
                                Acessar
                            </button>

                            <p className="text-end">Não possui cadastro? <Link to="/create">Clique aqui</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login;