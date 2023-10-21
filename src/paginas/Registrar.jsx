import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../Components/Alerta"
import clienteAxios from "../config/clienteAxios"


const RegistrarCuenta = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'hay campos vacios', error: true })
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({ msg: 'Los Password no son iguales', error: true })
      return;
    }
    if (password.length < 8) {
      setAlerta({ msg: 'El Password debe tener minimo 8 caracteres', error: true })
      return;
    }

    //Crear el Usuario en la API
    try {
      // const url = '/veterinarios'
      const respuesta = await clienteAxios.post('/veterinarios/registrar',{nombre,email,password})
      setAlerta({msg:" creado correctamente, revisa tu email"})
      console.log(respuesta)  
    } catch (error) {
      if (error.response) {
        // Error de respuesta del servidor (por ejemplo, código de estado HTTP no válido)
        console.error(error.response.data);
      } else if (error.request) {
        // No se pudo hacer la solicitud (probablemente debido al error de red)
        console.error('No se pudo hacer la solicitud:', error.request);
      } else {
        // Error general de Axios
        console.error('Error:', error.message);
      }
    }

  };
//saco el mensaje para hacer una validacion para mostrar el componente
   const {msg} = alerta

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y administra tus <span className="text-black">Pacientes</span></h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta
           alerta={alerta}
        />}

        <form
          onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu Nombre"
              className="border w-full p-2 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-2 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Registra tu Password"
              className="border w-full p-2 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Repetir Password
            </label>
            <input
              type="password"
              placeholder="Repetir Password"
              className="border w-full p-2 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value='Crear Cuenta'
            className="bg-indigo-700 w-full py-3 px-10  rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800  lg:w-auto md:flex md:justify-center md:items-center md:mt-6 "
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center text-gray-500 my-5 hover:text-gray-900 hover:cursor-pointer"
            to={"/"}> Ya tienes una cuenta? Inicia Sesion</Link>
          <Link
            className="block text-center text-gray-500 my-5 hover:text-gray-900 hover:cursor-pointer"
            to={"/olvide-password"}> Olvide mi Password</Link>
        </nav>
      </div>
    </>
  )
}
export default RegistrarCuenta


