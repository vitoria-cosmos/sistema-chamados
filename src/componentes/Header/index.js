// estamos importando a foto de avatar do usuário
import avatarImg from '../../assets/avatar.png';

// estamos importando o componente link para podermos ter a navegação entre páginas
import { Link } from 'react-router-dom';

// importar o useContext para podermos utilizar o contexto do usuário
import { useContext } from 'react';

// importar o contexto do usuário
import { AuthContext } from '../../contexts/auth';

// importar os ícones
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'

// importar o css do header
import './header.css';

export default function Header() {
    // agora vamos consumir o contexto
    // vamos ter acesso ao objeto de informação do usuário
    const { user } = useContext(AuthContext);
    return (
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="Foto do usuário"/>
                {/* <img src="https://avatars.githubusercontent.com/u/121966349?v=4" alt="Foto do usuário"/> */}
            </div>

            <Link to='/dashboard'>
                <FiHome color='#fff' size={24}/>
                Chamados
            </Link>

            <Link to='/customers'>
                <FiUser color='#fff' size={24}/>
                Clientes
            </Link>

            <Link to='/profile'>
                <FiSettings color='#fff' size={24}/>
                Perfil
            </Link>

        </div>
    )
}