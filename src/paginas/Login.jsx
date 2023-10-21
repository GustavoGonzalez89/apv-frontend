import { Link,useNavigate } from "react-router-dom"
import Alerta from "../Components/Alerta"
Alerta
import { useState } from "react"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"





const Login = () => {
    const [alerta,setAlerta]= useState({})
    const [password,setPassword]= useState('')
    const [email,setEmail]= useState('')
    const {setAuth} = useAuth()
   const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if([email,password].includes('')){
            setAlerta({
                msg:"TODOS LOS CAMPOS SON OBLIGATORIOS",
                error: true
            })
         return
        }
        try {
            const {data} = await clienteAxios.post('/veterinarios/login',{email,password})

            console.log(data)
            localStorage.setItem('token',data.token)

            setAuth(data) 

            navigate('/admin')
           
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
        }
    }
    const {msg} = alerta

  return (
   <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesion y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div className=" shadow-lg bg-white py-10 px-5 rounded-xl mt-10 md:mt-5">
        {msg && <Alerta
           alerta={alerta}
        />}
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
                    placeholder="Email de Registro"
                    className="border w-full p-2 mt-3 bg-gray-50 rounded-xl"
                    value={email}
                    onChange={e =>setEmail(e.target.value)}

                     />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Password
                    </label>
                    <input 
                    type="Password"
                    placeholder="Tu Password"
                    className="border w-full p-2 mt-3 bg-gray-50 rounded-xl" 
                    value={password}
                    onChange={e =>setPassword(e.target.value)}
                     />
                </div>
                <input 
                type="submit"
                value='Iniciar Sesion'
                className="bg-indigo-700 w-full py-3 px-10  rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800  lg:w-auto md:flex md:justify-center md:items-center md:mt-6 "
                />
            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
                <Link 
                className="block text-center text-gray-500 my-5 hover:text-gray-900 hover:cursor-pointer"
                to={"/registrar"}> No tienes una cuenta? Registrate</Link>
                <Link 
                className="block text-center text-gray-500 my-5 hover:text-gray-900 hover:cursor-pointer"
                to={"/olvide-password/"}> Olvide mi Password</Link>
            </nav>
        </div>
   </>
  )
}

export default Login