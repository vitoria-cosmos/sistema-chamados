// Configuração das nossas rotas

// aqui a gente está importando os componentes para podermos fazer a navegação de páginas
//  Routes é o componente pai que vai receber como filhos as rotas de cada página do projeto
import { Routes, Route } from 'react-router-dom';

// aqui a gente está importando os componentes das nossas páginas
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

// importando o componente que deixa as rotas privadas
import Private from './Private';


// aqui é o componente das nossa navegação entre páginas
function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={ <SignIn/> }/>
            <Route path='/register' element={ <SignUp/> }/>
            <Route path='/dashboard' element={ <Private><Dashboard/></Private> }/>
        </Routes>
    )
}

export default RoutesApp;