// inicializar o app
import { initializeApp } from 'firebase/app';

// serve para pegarmos o auth para podermos fazer a autenticação de usuários
import { getAuth } from 'firebase/auth';

// aqui serve para podermos pegar o firestore em que vamos usar para criar, deletar, editar dados
import { getFirestore } from 'firebase/firestore';

// aqui serve para pegarmos o storage do firestore em que vamos poder fazer o upload de media
import { getStorage } from 'firebase/storage';

// aqui são as configurações do firebase que precisamos para utilizá-lo
const firebaseConfig = {
    apiKey: "AIzaSyB5rlfJecsgehUB2zl3G2aiZ2GrhvBC9lU",
    authDomain: "sistema-chamados-d480e.firebaseapp.com",
    projectId: "sistema-chamados-d480e",
    storageBucket: "sistema-chamados-d480e.firebasestorage.app",
    messagingSenderId: "161790175057",
    appId: "1:161790175057:web:24518359c4c2f7066f5570",
    measurementId: "G-MC8GRSRB2V"
};

// inicializa o o banco de dados com as configurações
const firebaseApp = initializeApp(firebaseConfig);

// pega o auth do firebase
const auth = getAuth(firebaseApp);

// pega o firestore do firebase
const db = getFirestore(firebaseApp);

// pega o storage do firebase
const storage = getStorage(firebaseApp);

// exportar as funcionalidades que queremos usar
export { auth, db, storage };