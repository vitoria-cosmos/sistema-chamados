// componente do sign in
// página de login

import { useState, useContext } from 'react';
// o useContext é para podermos utilizar os contextos
import './signin.css';

import logo from '../../assets/logo.png';

// o link é para podermos navegar para outra página
import { Link } from 'react-router-dom';

// aqui vamos importar o contexto que criamos
import { AuthContext } from '../../contexts/auth'


export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // estamos buscando o signIn
    const { signIn, loadingAuth } = useContext(AuthContext);


    async function handleSignIn(e) {
        e.preventDefault();
        // alert('TESTE');

        if(email !== '' && password !== ''){
            await signIn(email, password);
        }

    }
    return (
        <div className="container-center">
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo do sistema de chamados'/>
                </div>

                <form onSubmit={handleSignIn}>
                    <h1>Entrar</h1>
                    <input 
                        type='text'
                        placeholder='email@email.com' 
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }                 
                    />

                    <input
                        type='password'
                        placeholder='********'
                        value={password}
                        onChange={ (e) => setPassword(e.target.value)}
                    
                    />

                    <button type='submit'>
                        {loadingAuth ? "Carregando..." : "Acessar" }
                    </button>
                </form>

                <Link to='/register'>Criar uma conta</Link>
            </div>
            
        </div>
    )
}