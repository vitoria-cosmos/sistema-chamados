import './customers.css';
import Title from '../../componentes/Title';
import Header from '../../componentes/Header';
import { FiUser } from 'react-icons/fi';

import { useState} from 'react';

// importar o banco de dados
import { db } from '../../services/firebaseConnection';
import {addDoc, collection } from 'firebase/firestore';

// importar a notificação de sucesso
import { toast } from 'react-toastify';

export default function Customers() {

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    // a função tem que ser assíncrona, pois ela vai ter que se comunicar com
    // o banco de dados e isso demora, por isso, o resto do código não pode parar.
    async function handleRegister(e) {
        e.preventDefault();
        // previnir que a página seja atualizada
        // alert("TESTE")

        // se não faltar nenhuma informação, podemos cadastrar os dados
        if (nome !== '' && cnpj !== '' && endereco !== '') {
            // o addDoc cria um id automaticamente
            await addDoc(collection(db, "customers"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco

            })
            .then(() => {
                // limpar os campos
                setNome('');
                setCnpj('');
                setEndereco('');
                toast.success('Cliente cadastrado com sucesso!');
            })
            .catch((error) => {
                console.log(error)
                toast.error("Erro ao fazer o cadastro.")

            })

        } else {
            toast.error('Preencha todos os campos!');
        }
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