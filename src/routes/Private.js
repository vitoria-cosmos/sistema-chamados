
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function Private({ children }) {
    // console.log("TESTEEEE");

    // vamos trazer o nosso contexto para usarmos no componente
    // vamos pegar a state signed do nosso contexto
    const { signed, loading } = useContext(AuthContext);

    // o signed vai ser true quando o usuário estiver logado
    console.log(signed)

    // aqui é um loading para aparecer enquanto os dados do usuário não estão sendo carregados na tela
    if(loading) {
        return (
            <div>Carregando...</div>
        )
    }

    // verificação para que se o usuário não estiver logado, redirecionar ele para a página de login
    if(!signed) {
        return <Navigate to={'/'} />
    }

    // aqui estamos deixando o usuário navegar, pois ele está logado
    return children;
}