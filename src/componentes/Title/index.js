import './title.css';

// esse children é para pegar o que tá dentro do componente e podemos renderizar onde quisermos
// podemos receber várias propriedades como o name e utilizá-los nos componentes de acordo com o contexto
export default function Title({ children, name }) {
    return (
        <div className='title'>
            {children}
            <span>{name}</span>
        </div>
    )
}