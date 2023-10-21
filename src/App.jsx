import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

import { AuthProvider } from './context/authPovider';
import { PacientesProvider } from './context/PacientesProvider';

import Login from './paginas/Login';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import RegistrarCuenta from './paginas/Registrar';
import NuevoPassword from './paginas/NuevoPassword';

import AdministrarPacientes from './paginas/AdministrarPacientes'
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/CambiarPassword';




function App() {


  return (
    // <BrowserRouter>
    //     <Routes>
    //         <Route path="/" element={<AuthLayout />}>
    //             <Route index element ={<Login/>}/>
    //             <Route path='Olvide-Password'  element ={<OlvidePassword/>}/>
    //             <Route path='confirmar-cuenta' element ={<ConfirmarCuenta/>}/>
    //             <Route path='registrar' element ={<RegistrarCuenta/>}/>
    //         </Route>
    //     </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<RegistrarCuenta />} />
              <Route path='olvide-password/' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiar-password' element={<CambiarPassword />} />
            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
};

export default App
