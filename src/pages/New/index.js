
import Header from '../../componentes/Header';
import Title from '../../componentes/Title';

import { FiPlusCircle } from 'react-icons/fi';

import './new.css';

// usamos o useEffect oara que quando abrirmos a páginas, os dados já sejam rodados
import { useState, useEffect, useContext } from 'react';

// importar o nosso contexto para pegarmos os dados do usuário
import { AuthContext } from '../../contexts/auth';

// importar o firebase para podermos buscar os dados do banco de dados
// importar o banco de dados
import { db } from '../../services/firebaseConnection';

// pegar a coleção, os documentos, um item específico e o nosso doc 
import { collection, getDocs, getDoc, doc, addDoc } from 'firebase/firestore';

// importar o toast com as notificações personalizadas 
import { toast } from 'react-toastify'

// importar esse hook para sabermos o id do item
import { useParams } from 'react-router-dom';


// aqui vamos acessar uma coleção chamada customers
const listRef = collection(db, "customers");


export default function New() {

    // pegar os dados do usuário
    const { user } = useContext(AuthContext);

    const [customers, setCustomers] = useState([]);
    const [loadCustomer, setLoadCustomer] = useState(true);

    const [complemento, setComplemento] = useState('');
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');

    // usuário selecionado, vai começar na posição 0
    const [customerSelected, setCustomerSelected] = useState(0);

    // eu quero pegar o nosso id 
    const { id } = useParams(); 

    const [idCustomer, setIdCustomer] = useState(false);


    useEffect(() => {

        // estamos realmente pegando o id
        // console.log(id);


        async function loadCustomers() {
            // vamos pegar tudo que tem dentro da coleção customers
            const querySnapshot = await getDocs(listRef)
            // snapshot é toda a nossa lista de clientes cadastrado
            .then((snapshot) => {
                // console.log(snapshot.docs);

                let lista = [];
                // percorrer a lista, usamos forEach
                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })
                // console.log('Lista de clientes: ', lista);
                // adicionar os clientes encontrados na state
                // se não tiver nenhum cliente cadastrado, vamos mostrar um item generico
                if (snapshot.docs.size === 0) {
                    console.log('Nenhuma empresa encontrada');
                    setCustomers([{ id: '1', nomeFantasia: 'FREELA'}]);
                    setCustomers(false);
                    return;
                }
                // se tiver item na lista, vamos prosseguir
                setCustomers(lista);
                setLoadCustomer(false);

                if (id) {
                    loadId(lista);
                }
            })
            .catch((error) => {
                console.log("Erro ao buscar os clientes: ", error);
                setLoadCustomer(false);
                setCustomers([{id: '1', nomeFantasia: 'FREELA'}])
            })
        }
        loadCustomers();


    }, [id])


    // buscar o chamado de um id específico
    async function loadId(lista) {
        const docRef = doc(db, "chamados", id);
        await getDoc(docRef)
        .then((snapshot) => {
            setAssunto(snapshot.data().assunto)
            setStatus(snapshot.data().status)
            setComplemento(snapshot.data().complemento);

            // achar o index do cliente atual
            let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
            setCustomerSelected(index);

            // vou informar que temos id para editarmos
            // estamos em uma tela para editar chamados
            setIdCustomer(true)
        })
        .catch((error) => {
            console.log(error)
            setIdCustomer(false);
        })
    }


    // função para mudar o status
    function handleOptionChange(e) {
        setStatus(e.target.value);
        console.log(e.target.value);
    }

    function handleChangeSelect(e) {
        // toda vez que a pessoa trocar de opção, a state vai ser atualizada
        setAssunto(e.target.value);
        console.log('Assunto: ', e.target.value);
    }

    function handleChangeCustomer(e) {
        setCustomerSelected(e.target.value);

        // acessar o nome do cliente por meio da sua posição
        console.log(customers[e.target.value].nomeFantasia);
    }

    async function handleRegister(e) {
        e.preventDefault();
        // alert('TESTE');

        // se tiver um id, significa que queremos editar
        if (idCustomer) {
            alert('EDITANDO CHAMADO')
            return;
        }

        // vamos criar uma coleção chamada chamados e dentro vamos adicionar os documentos com
        // os dados dos campos do formulário que queremos salvar no banco

        // registrar um chamado
        await addDoc(collection(db, "chamados"), {
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid,
        })
        .then(() => {
            toast.success("Chamado registrado!")
            setComplemento('')
            setCustomerSelected(0)
        })
        .catch((error) => {
            toast.error('Ops, erro ao registrar!');
            console.log(error);
        })
    }

    return (
        <div>
            <Header/>
            <div className='content'>
                <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Clientes</label>
                        {/* <select>
                            <option key={1} value={1}>Mercado Teste</option>
                            <option key={1} value={2}>Loja Informática</option>
                        </select> */}

                        {/* carregar os dados do banco no select */}
                        {

                            loadCustomer ? (
                                <input type="text" disabled={true} value="Carregando..."/>
                            ) : (
                                <select value={customerSelected} onChange={handleChangeCustomer}>
                                    {/* vamos percorrer a lista de clientes */}
                                    {/* o key é para sebermos a posição do item */}
                                    {/* value é a posição do elemento que selecionamos no array*/}
                                    {customers.map((item, index) => {
                                        return (
                                            <option key={index} value={index}>
                                                {item.nomeFantasia}
                                            </option>
                                        )
                                    })}
                                </select>
                             

                             )
                        }

                        <label>Assunto: </label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Técnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input 
                            type='radio'
                            name='radio'
                            value='Aberto' 
                            onChange={handleOptionChange} 
                            
                            // aqui é pra saber se está marcado ou não
                            checked={status === 'Aberto'}                         
                            />
                            <span>Em aberto</span>

                            <input 
                            type='radio'
                            name='radio'
                            value='Progresso' 
                            onChange={handleOptionChange}    
                            checked={status === 'Progresso'}                       
                            />
                            <span>Progresso</span>

                            <input 
                            type='radio'
                            name='radio'
                            value='Atendido' 
                            onChange={handleOptionChange} 
                            checked={status === 'Atendido'}                          
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                        type="text"
                        placeholder='Descreva seu problema (opcional).'
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button type='submit'>Registrar</button>

                    </form>

                </div>
            </div>
        </div>
    )
}