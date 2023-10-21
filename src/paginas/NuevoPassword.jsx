import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Alerta from "../Components/Alerta"
import clienteAxios from "../config/clienteAxios"
import { Link } from "react-router-dom"




const NuevoPassword = () => {
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams()
    const { token } = params
    console.log(params)


    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios.get(`/veterinarios/olvide-password/${token}`)
                setAlerta({
                    msg: 'COLOCA TU NUEVO PASSWORD'
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un Error con el enlace',
                    error: true
                })
                setTokenValido(false)
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === "") {
            setAlerta({
                msg: "El campo Password es obligatorio",
                error: true
            })
            return
        }
        if (password.length < 8) {
            setAlerta({
                msg: "El campo Password debe tener 8 o mas caracteres",
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post(`/veterinarios/olvide-password/${token}`, { password })
            setAlerta({
                msg: data.msg
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: 'error.response.data.msg',
                error: true
            })
        }

    }
    const { msg } = alerta
    return (
        <>
            <div className="-center">
                <h1 className="text-indigo-700 text-6xl font-black ">Restablece tu password y no Pierdas Acceso a<span className="text-black"> tus Pacientes</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta
                    alerta={alerta}
                />}
                {tokenValido &&
                    <form
                        onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                            >
                                Nuevo Password
                            </label>
                            <input
                                type="password"
                                placeholder="Registra tu Nuevo Password"
                                className="border w-full p-2 mt-3 bg-gray-50 rounded-xl"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value={'Registrar Nuevo Password'}
                            className="border py-3 px-6 bg-indigo-700 text-white text-xl fond-bold rounded-xl hover:bg-indigo-800 hover:cursor-pointer lg:w-auto md:flex md:justify-center md:items-center w-full" />
                    </form>
                }
                {passwordModificado &&
                    <Link
                        className="block text-center text-gray-500 my-5 hover:text-gray-900 hover:cursor-pointer"
                        to={"/"}>Inicia Sesion
                    </Link>
                }

            </div>
        </>
    )
}
export default NuevoPassword