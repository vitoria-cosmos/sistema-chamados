// importar o componente para podermos ter a navegação por páginas
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes';

import AuthProvider from './contexts/auth';

// importar o estilo css do react-toastify
import 'react-toastify/dist/ReactToastify.css';
// trazendo o toast container
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* o toast vai desaparecer depois de 3 segundos */}
        <ToastContainer autoClose={3000}/>
        <RoutesApp/> 
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
