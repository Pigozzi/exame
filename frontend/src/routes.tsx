import { Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Options from './pages/Escolha';
import Cadastro from './pages/Cadastro';
import Painel from './pages/Painel';

import Token from './pages/Token';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Login} />
            <Route path="/create" component={Cadastro} />
            <Route exact path="/options" component={Options} />
            <Route exact path="/token" component={Token} />
            <Route path="/panel" component={Painel} />
        </BrowserRouter>
    );
}

export default Routes;