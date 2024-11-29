import Header from '../../componentes/Header';
import Title from '../../componentes/Title';

// ícone para colocar na pagina de perfil
import { FiSettings } from 'react-icons/fi';

export default function Profile(){
    return (
        <div>
            <Header/>
            <div className='content'>
                <div>
                    {/* utilizando a propriedade name */}
                    <Title name="Meu perfil">
                        <FiSettings size={25}/>
                    </Title>
                </div>                
                <h1>Página perfil</h1>
            </div>
           
        </div>
    )
}