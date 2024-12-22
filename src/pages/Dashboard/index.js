
// aqui é para podermos utilizar o nosso contexto realmente
import { useContext } from 'react';
// aqui estamos trazendo o nosso contexto para utilizarmos nesta pagina!
import { AuthContext } from '../../contexts/auth';

import Header from '../../componentes/Header';
import Title from '../../componentes/Title';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';

import './dashboard.css';

// importar o link para navegarmos entre as páginas
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const { logout } = useContext(AuthContext);

    async function handleLogout() {
        await logout();
    }
    return (
        <div>
            <Header/>
            <div className='content'>       
                <Title name='Tickets'>
                    <FiMessageSquare size={25}/>                   
                </Title>  
                
            {/*Abrir um fragment, que é como se fosse uma div  */}
            {/* é uma tag sem estilização */}

            <>
                <Link to="/new" className='new'>
                    <FiPlus color='#fff' size={25}/>
                    Novo chamado               
                </Link>
                <table>
                    <thead>
                        <tr>
                            {/* o atributo col diz que cada th faz parte de uma coluna */}
                            <th scope='col'>Cliente</th>
                            <th scope='col'>Assunto</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Cadastrado em</th>
                            <th scope='col'>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Cliente">Mercado Esquina</td>
                            <td data-label="Assunto">Suporte</td>
                            <td data-label="Status">
                                <spna className='badge' style={{ backgroundColor: '#999'}}>
                                    Em aberto
                                </spna>
                            </td>
                            <td data-label="cadastrado">12/05/2022</td>
                            <td data-label='#'>
                                <button className='action' style={{ backgroundColor: '#3583f6'}}>
                                    <FiSearch color='#fff' size={17}/>
                                </button>
                                <button className='action' style={{ backgroundColor: '#f6a935'}}>
                                    <FiEdit2 color='#fff' size={17}/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            
            
            </>
            </div>
            
            <button onClick={handleLogout}>Sair da conta</button>
        </div>
    )
}