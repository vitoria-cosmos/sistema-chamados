import { useContext, useState } from 'react';
import Header from '../../componentes/Header';
import Title from '../../componentes/Title';

// ícone para colocar na pagina de perfil
import { FiSettings, FiUpload  } from 'react-icons/fi';
import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/auth';

import './profile.css';

// importar o nosso banco de dados
import { db, storage } from '../../services/firebaseConnection';
import { doc, updateDoc } from 'firebase/firestore';

// pegar o nosso storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// importando a notificação personalizada
import { toast } from 'react-toastify';

export default function Profile(){
    const { user, storageUser, setUser, logout } = useContext(AuthContext);
    // aqui estamos exportando os contextos do nosso projeto

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    // imagem que o usuário mandou no input
    const [imageAvatar, setImageAvatar] = useState(null);
    const [name, setName] = useState(user && user.nome);
    // se tiver usuario, vai colocar o nome do usuário como padrão no campo

    const [email, setEmail] = useState(user && user.email);

    function handleFile(e) {
        // console.log(e.target.files);
        // o evento manda o valor da imagem

        if(e.target.files[0]) {
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);

                // cria uma url para a imagem
                setAvatarUrl(URL.createObjectURL(image))
            }else {
                alert("Envie uma imagem do tipo PNG ou JPEG");
                setImageAvatar(null);
                return;
            }
        }
    }

    async function handleUpload() {
        const currentUid = user.uid;

        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

        const uploadTask = uploadBytes(uploadRef, imageAvatar)
        .then((snapshot) => {
            // console.log('ENVIADO COM SUCESSO!')
            getDownloadURL(snapshot.ref).then( async (downloadURL) => {
                let urlFoto = downloadURL;

                const docRef = doc(db, "users", user.uid)
                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    nome: name
                })
                .then(() => {
                    let data = {
                        ...user,
                        nome: name, 
                        avatarUrl: urlFoto,

                    }

                    setUser(data);
                    storageUser(data);
                    toast.success("Atualizado com sucesso!");
                })
            })

        })
        .catch((error) => {
            console.log('Ocorreu um erro ao tentar fazer o download da imagem: ', error);
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // aqui é para que a página não recarregue automaticamente

        // alert("TESTE");

        if(imageAvatar === null && name !== '') {
            // Atualizar apenas o nome do usuário
            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
                nome: name
            })
            .then(() => {
                let data = {
                    ...user,
                    nome: name
                }
                setUser(data);
                storageUser(data);
                toast.success("Atualizado com sucesso!");
            })
        } else if (name !== '' && imageAvatar !== null) {
            // Atualizar tanto nome quanto a foto
            handleUpload();
        }
    }

    return (
        <div>
            <Header/>
            <div className='content'>
              
                {/* utilizando a propriedade name */}
                <Title name="Meu perfil">
                    <FiSettings size={25}/>
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleSubmit}>
                        <label className='label-avatar'> 
                            <span>
                                <FiUpload color='#fff' size={25}/>
                            </span>
                            <input type='file' accept='image/*' onChange={handleFile} /><br/>
                            {avatarUrl === null ? (
                                <img src={avatar} alt='Foto de perfil' width={250} height={250}/>
                            ) : (
                                <img src={avatarUrl} alt='Foto de perfil' width={250} height={250}/>
                            )}
                        </label>
                        <label>Nome</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>

                        <label>Email: </label>
                        <input type='text' value={email} disabled={true}/>

                        <button type='submit'>Salvar</button>

                    </form>

                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={() => logout()}>Sair</button>
                </div>


                

                            
               
            </div>
           
        </div>
    )
}