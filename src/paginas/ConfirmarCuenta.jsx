import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import Alerta from "../Components/Alerta"
import axios from "axios"


const ConfirmarCuenta = () => {
  const [cuentaConfirmadaa, setCuentaConfirmadaa] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `http://localhost:4000/api/veterinarios/confirmar/${id}`

        const { data } = await axios(url)

        console.log(data)
        // si pasa la peticion axios entonces la cuenta estaria confirmada sino cae directo al catch saltando setCuentaConfirmada

        setCuentaConfirmadaa(true)
        setAlerta({
          msg: data.msg
        })
        console.log(data)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

      setCargando(false)

    }
    confirmarCuenta();

  },[])

  return (
    // copiamos el cuerpo de registrar.jsx
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Confirma tu Cuenta y Comienza a Administrar tus <span className="text-black">Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando &&
          <Alerta
            alerta={alerta}
          />}
        {cuentaConfirmadaa && (
          <Link
            className="block text-center text-gray-500 my-5 hover:text-gray-900 hover:cursor-pointer"
            to={"/"}>Inicia Sesion
          </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta