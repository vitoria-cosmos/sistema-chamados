
import { useState, createContext, useEffect } from 'react';

import { auth, db } from '../services/firebaseConnection';

// importando o método para que possamos criar uma conta
// depois, vamos importar o método de fazer login
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// agora vamos pegar os métodos para acessar o banc de dados
import { doc, getDoc, setDoc } from 'firebase/firestore';

// hook para que possamos navegar para a página dashboard
import { useNavigate } from 'react-router-dom';

// importar o toast para que as notificações sejam personalizadas!
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    // instanciando o navigate
    const navigate = useNavigate();

    async function signIn(email, password) {
        // console.log(email);
        // console.log(password);
        // alert('LOGADO COM SUCESSO')

        setLoadingAuth(true);
        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            const docRef = doc(db, "users", uid);
            // acessa os dados do usuário
            const docSnap = await getDoc(docRef)

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }

            setUser(data);
            // o localStorage vai sempre mudar quando lugar um outro usuário e assim por diante, nunca vai adicionar mais a lista
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem-vindo(a) de volta!');
            navigate('/dashboard');
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error('Ops, algo deu errado!');
        })
    }

    // Cadastrar um novo user
    async function signUp(email, password, name) {
        // enquanto a gente cria o usuário no banco, o loading vai está true
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            // aqui vamos esperar criar uma nova coleção users com o uid do usuário 
            // o db é a chave para termos acesso ao banco
            await setDoc(doc(db, "users", uid), {
                nome: name,
                avatarUrl: null
            })
            .then(() => {
                // alert("cadastrado com sucesso!");

                // vamos passar os dados do usuário para um objeto
                // depois, vamos passar os dados para a state user
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                };

                setLoadingAuth(false);
                storageUser(data);
                // toast ao entrar na tela de dashboard
                toast.success('Seja bem-vindo ao sistema!');
                // usando o navigate para redirecionar o usuário para a página de dashboard
                navigate('/dashboard');
            })

        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })

        console.log(name);

    }

    // função para guardar os dados do usuário no localStorage
    function storageUser(data) {
        // salvando o objeto no localStorage como string
        localStorage.setItem('@ticketsPRO', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider
        // !!user vai converter a variável user para booleano
        // como ea começa com null, o valor dela vai ser falso
         value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            loadingAuth
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;