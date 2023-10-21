import { useState } from "react"
import AdminNav from "../Components/AdminNav"
import Alerta from "../Components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''

  })
  
  const {guardarPassword} = useAuth();

  const handleSubmit = async e => {
    e.preventDefault()

    if(Object.values(password).some(campo => campo === "")){
        setAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true
       })
       return;
    }
    if(password.pwd_nuevo.length < 6 ){
      setAlerta({
        msg: 'Debe contener minimo 6 caracteres',
        error: true
       })
       return;
    }
 

    const respuesta = await guardarPassword(password)
    setAlerta(respuesta)
  }
  
  const { msg } = alerta;
  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10  ">Cambair Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
        <span className="text-indigo-600 font-bold">Pasword aqui</span>
      </p>

      <div className="flex justify-center">
        <div className=" w-full md:w-1/2 bg-white shadow-lg p-5 rounded-lg">
          {msg && <Alerta alerta={alerta} />}
          <form
            onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="nombre"
                className=" uppercase font-bold text-gray-700 ">Password Actual</label>

              <input
                name="pwd_actual"
                className="w-full border bg-gray-50 rounded-md px-3 py-2 mt-2"
                type="password"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
                placeholder="Escribe tu password actual" />
            </div>

            <div className="my-3">
              <label
                htmlFor="nombre"
                className=" uppercase font-bold text-gray-700 ">Password Nuevo</label>

              <input
                name="pwd_nuevo"
                className="w-full border bg-gray-50 rounded-md px-3 py-2 mt-2"
                type="password"
                placeholder="Escribe tu password nuevo"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })} />
              <input
                type="submit"
                value={'GUARDAR CAMBIOS'}
                className="w-full font-bold border  px-10 py-2 mt-5 rounded-md bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer text-white text-sm lg:w-auto" />
            </div>


          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarPassword