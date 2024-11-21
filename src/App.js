// importar o componente para podermos ter a navegação por páginas
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes';

function App() {
  return (
    <BrowserRouter>
      <RoutesApp/> 
    </BrowserRouter>
  );
}

export default App;
