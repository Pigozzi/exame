import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import '../styles/login.css';

function Painel() {

    const history = useHistory();

    const [users, setUser] = useState([]);

    const user_id = localStorage.getItem('id');

    useEffect(() => {
        api.get(`/users/${user_id}`, {
            headers: {
                Authorization: user_id,
            }
        }).then(response => {
            setUser(response.data)
        })
    }, [user_id]);

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    async function handleDelete(event: FormDataEvent) {
        event.preventDefault();

        try {
            await api.delete(`/delete/${user_id}`, {
                headers: {
                    Authorization: user_id,
                }
            });

            alert('Usuário deletado com sucesso!!')

            history.push('/')

        } catch (err) {
            alert('Erro ao deletar usuário')
        }
    }

    return (

        <main>
            <div className="container">
                <div className="full-height row align-items-center justify-content-center">
                    <div className="col-8">
                        {users.map(user => (
                            <div id="page-login" key={user.id}>
                                <div className="row text-center justify-content-center align-items-center">
                                    <div className="col-12 input-block">
                                        <h2>Bem-vindo, {user.fullName}!</h2>
                                        <p className="mt-3"><b>Telefone: {user.phone}</b></p>
                                        <p><b>E-mail: {user.email}</b></p>
                                    </div>
                                    <button className="button-delete mt-2" type="submit" onClick={handleDelete}>
                                        Deletar usuário
                                    </button>
                                    <button className="confirm-button mt-2" type="submit" onClick={handleLogout}>
                                        Sair
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Painel;