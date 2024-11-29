
// aqui é para podermos utilizar o nosso contexto realmente
import { useContext } from 'react';
// aqui estamos trazendo o nosso contexto para utilizarmos nesta pagina!
import { AuthContext } from '../../contexts/auth';

import Header from '../../componentes/Header';

export default function Dashboard() {
    const { logout } = useContext(AuthContext);

    async function handleLogout() {
        await logout();
    }
    return (
        <div>
            <Header/>
            <div className='content'>
                <h1>Página Dashboard</h1>
            </div>
            
            <button onClick={handleLogout}>Sair da conta</button>
        </div>
    )
}