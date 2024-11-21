// Configuração das nossas rotas

// aqui a gente está importando os componentes para podermos fazer a navegação de páginas
//  Routes é o componente pai que vai receber como filhos as rotas de cada página do projeto
import { Routes, Route } from 'react-router-dom';

// aqui a gente está importando os componentes das nossas páginas
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';


// aqui é o componente das nossa navegação entre páginas
function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={ <SignIn/> }/>
            <Route path='/register' element={ <SignUp/> }/>
        </Routes>
    )
}

export default RoutesApp;