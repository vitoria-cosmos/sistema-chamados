
// aqui é para podermos utilizar o nosso contexto realmente
import { useContext, useEffect, useState } from 'react';
// aqui estamos trazendo o nosso contexto para utilizarmos nesta pagina!
import { AuthContext } from '../../contexts/auth';

import Header from '../../componentes/Header';
import Title from '../../componentes/Title';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';

import './dashboard.css';

// importar o link para navegarmos entre as páginas
import { Link } from 'react-router-dom';

// importar as ações que iremos precisar para acessar os dados no banco
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore';

// importar o banco de dados
import { db } from '../../services/firebaseConnection';

// biblioteca para formatar a data
import { format } from 'date-fns';

// IMPORTAR O NOSSO MODAL
import Modal from '../../componentes/Modal';

// fazer a nossa referencia, em que iremos querer acessar a coleção de chamados
const listaRef = collection(db, "chamados");



export default function Dashboard() {
    const { logout } = useContext(AuthContext);

    // states para guardar os dados do banco
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    // último documento renderizado
    const [lastDocs, setLastDocs] = useState();

    const [loadingMore, setLoadingMore] = useState(false);

    // state para controlar a abertura do modal
    const [showPostModal, setShowPostModal] = useState(false);

    // state para guardar as informações do chamado
    const [detail, setDetail] = useState();

    // async function handleLogout() {
    //     await logout();
    // }

    useEffect(() => {
        async function loadChamados() {
            // irei ordenar os dados de acordo com a data de criação e por ordem decrescente
            // do mais recente para o menos recente
            // o limite ele vai buscar os cinco u´ltimos chamados que ele encontrar
            const q = query(listaRef, orderBy('created', 'desc'), limit(5));


            // vou buscar os documentos com base na query que eu passei
            const querySnapshot = await getDocs(q)

            // zerar o array para os dados não serem duplicados
            setChamados([]);

            await updateState(querySnapshot)

            setLoading(false);
        }

        loadChamados();

        return () => {

        }
    }, [])

    async function updateState(querySnapshot) {
        // a lista vai começar vazia
        const isCollectionEmpty = querySnapshot.size === 0;

        if (!isCollectionEmpty) {
            let lista = [];

            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento,
                })
            })

            // pegando o último item
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] // Pegando o último item
            console.log('último item: ', lastDoc);

            // estamos usando o spread operator para que possamos ficar adicionando novos chamados
            // na lista quando já houver
            // eu não quero substituir, mas incrementaraos que já existiam
            setChamados(chamados => [...chamados, ...lista])

            // setar o último doc na state
            setLastDocs(lastDoc);

            console.log('teste lista: ',lista)
        } else {
            setIsEmpty(true);
        }

        setLoadingMore(false);


    }

    async function handleMore() {
        setLoadingMore(true);

        const q = query(listaRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(5))
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);

    }

    function toggleModal(item) {
        console.log(item);
        setShowPostModal(!showPostModal);
        setDetail(item);
    }

    if (loading) {
        return (
            <div>
                <Header/>

                <div className='content'>
                    <Title name="Tickets">
                        <FiMessageSquare size={25}/>
                    </Title>

                    <div className='container dashboard'>
                        <span>Buscando chamados...</span>

                    </div>

                </div>
            </div>
        )
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
                    

                    {/* renderização consicional para a lista de chamados */}

                    {chamados.length === 0 ? (
                        <div className='container dashboard'>
                            <span>Nenhum chamado encontrado...</span>
                            <Link to="/new" className='new'>
                                <FiPlus color='#fff' size={25}/>
                                Novo chamado               
                            </Link>

                        </div>

                    ) : (

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
                                    {/* index é a posição do index que estamos percorrendo */}
                                    {chamados.map((item, index) => {
                                        return (

                                            <tr key={index}>
                                                <td data-label="Cliente">{item.cliente}</td>
                                                <td data-label="Assunto">{item.assunto}</td>
                                                <td data-label="Status">
                                                    <spna className='badge' style={{ backgroundColor: item.status === 'Aberto'? '#5cb85c' : '#999' }}>
                                                        {item.status}
                                                    </spna>
                                                </td>
                                                <td data-label="cadastrado">{item.createdFormat}</td>
                                                <td data-label='#'>
                                                    <button className='action' style={{ backgroundColor: '#3583f6'}} onClick={ () => toggleModal(item)}>
                                                        <FiSearch color='#fff' size={17}/>
                                                    </button>
                                                    <Link to={`/new/${item.id}`} className='action' style={{ backgroundColor: '#f6a935'}}>
                                                        <FiEdit2 color='#fff' size={17}/>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            {/* se a state está com o valor true, então... */}
                            {/* ele só vai renderizar essa linha se a state tiver o valor true */}
                            {loadingMore && <h3>Buscando mais chamados...</h3>}

                            {/* se não tiver carregando e se a lista não estiver vazia, então... */}

                            {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}
                        
                        
                        </>
                        
                    )}
                    
                
                
                </>
            </div>
            {/* vamos mostrar o modal só se ele estiver true */}
            {showPostModal && (
                <Modal 
                conteudo={detail}
                close={() => setShowPostModal(!showPostModal)}
                
                
                />
            )}
            
            {/* <button onClick={handleLogout}>Sair da conta</button> */}
        </div>
    )
}