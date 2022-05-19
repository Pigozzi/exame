import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../services/api';
import '../styles/login.css';

export function Cadastro() {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVerification, setPasswordVerification] = useState('');

    const history = useHistory();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const data = {
                fullName,
                email,
                phone,
                confirmPassword,
                passwordVerification,
            }

            await api.post('/create', data);

            alert('Cadastro realizado com sucesso!');

            history.push('/')

        } catch (err) {
            alert('Erro ao cadastrar usuário!')
        }
    }

    return (
        <main>
            <div className="container">
                <div className="full-height row align-items-center justify-content-center">
                    <div className="col-6">
                        <form id="page-login" onSubmit={handleSubmit}>
                            <fieldset className="text-center">
                                <h2>Cadastrar novo usuário</h2>
                            </fieldset>
                            <div className="input-block">
                                <label htmlFor="user">Nome completo</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={event => setFullName(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="user">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="user">Telefone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={event => setPhone(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="passwordVerification">Senha</label>
                                <input
                                    type="password"
                                    id="passwordVerification"
                                    value={passwordVerification}
                                    onChange={event => setPasswordVerification(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="confirmPassword">Confirmar senha</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={event => setConfirmPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <button className="confirm-button mb-3" type="submit">
                                Cadastrar
                            </button>

                            <p className="text-end">Já possui cadastro? <Link to="/">Clique aqui</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cadastro;