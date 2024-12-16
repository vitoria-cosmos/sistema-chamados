import './customers.css';
import Title from '../../componentes/Title';
import Header from '../../componentes/Header';
import { FiUser } from 'react-icons/fi';

import { useState} from 'react';

export default function Customers() {

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    function handleRegister(e) {
        e.preventDefault();
        // previnir que a página seja atualizada
        alert("TESTE")
    }

    return (
        <div>
            <Header/>
            <div className='content'>               
                <Title name='Clientes'>
                    <FiUser size={25}/>
                </Title>  
                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Nome fantasia: </label>
                        <input
                          type='text'
                          placeholder='Nome da empresa'
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}                         
                        />

                        <label>CNPJ: </label>
                        <input
                        type='text'
                        placeholder='Digite o CNPJ'
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        />

                        <label>Endereço: </label>
                        <input
                        type='text'
                        placeholder='Endereço da empresa'
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}                      
                        />

                        <button type='submit'>Salvar</button>

                    </form>

                </div>

            </div>
        </div>
    );
}