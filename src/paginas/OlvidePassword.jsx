import { Link } from "react-router-dom";
import Alerta from "../Components/Alerta";
import { useState } from "react";
import clienteAxios from "../config/clienteAxios";



const OlvidePassword = () => {
  const[email,setEmail] = useState('')
  const[alerta,setAlerta] = useState({})

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(email === '' || email.length < 6){
      setAlerta({msg:"El email es obligatorio", error: true})
      return
    }
    try {
      const {data}= await clienteAxios.post('/veterinarios/olvide-password',{email})

      console.log(data )
      setAlerta({
        msg: data.msg
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }
 const {msg} = alerta 

  return (
    <>
      <div className="-center">
        <h1 className="text-indigo-700 text-6xl font-black ">Recupera tu Acceso y no Pierda<span className="text-black"> tus Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta
        alerta = {alerta}/> }
        <form
        onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email de Registro"
              className="border w-full p-2 mt-3 bg-gray-50 rounded-xl"

            />
          </div>
          <input
            type="submit"
            value='Enviar instrucciones'
            className="bg-indigo-700 w-full py-3 px-10  rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800  lg:w-auto md:flex md:justify-center md:items-center md:mt-6 "
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center text-gray-500 my-5 hover:text-gray-900 hover:cursor-pointer"
            to={"/registrar"}> No tienes una cuenta? Registrate</Link>
          <Link
            className="block text-center text-gray-500 my-5 hover:text-gray-900 hover:cursor-pointer"
            to={"/"}> Ya tienes una cuenta? Inicia Sesion</Link>
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword