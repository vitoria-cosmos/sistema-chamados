import './custumers.css';
import Title from '../../componentes/Title';
import Header from '../../componentes/Header';
import { FiUser } from 'react-icons/fi';

export default function Custumers() {
    return (
        <div>
            <Header/>
            <div className='content'>
                <div>
                    <Title name='Clientes'>
                        <FiUser size={25}/>
                    </Title>
                </div>
                
            </div>
        </div>
    );
}