
// aqui é para podermos utilizar o nosso contexto realmente
import { useContext } from 'react';
// aqui estamos trazendo o nosso contexto para utilizarmos nesta pagina!
import { AuthContext } from '../../contexts/auth';

import Header from '../../componentes/Header';
import Title from '../../componentes/Title';
import { FiHome } from 'react-icons/fi';

export default function Dashboard() {
    const { logout } = useContext(AuthContext);

    async function handleLogout() {
        await logout();
    }
    return (
        <div>
            <Header/>
            <div className='content'>
                <div>
                    <Title name='Home'>
                        <FiHome size={25}/>
                        
                    </Title>
                </div>
                
            </div>
            
            <button onClick={handleLogout}>Sair da conta</button>
        </div>
    )
}