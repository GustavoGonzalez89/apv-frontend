import AdminNav from "../Components/AdminNav"
import useAuth from "../hooks/useAuth"
import { useState, useEffect } from "react"
import Alerta from '../Components/Alerta'

const EditarPerfil = () => {
    const { auth, actualizarPerfil } = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault();
        const { nombre, email } = perfil
        if ([nombre, email].includes('')) {
            setAlerta({
                msg: 'Todos los Campos son Obligatorio',
                error: true
            })
            return;
        }
        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)
    }
    const { msg } = alerta

    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10  ">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
                <span className="text-indigo-600 font-bold">Informacion aqui</span>
            </p>

            <div className="flex justify-center">
                <div className=" w-full md:w-1/2 bg-white shadow-lg p-5 rounded-lg">
                    {msg && <Alerta alerta={alerta} />}
                    <form
                        onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label
                                htmlFor="nombre"
                                className=" uppercase font-bold text-gray-700 ">Nombre</label>

                            <input
                                name="nombre"
                                id="nombre"
                                className="w-full border bg-gray-50 rounded-md px-3 py-2 mt-2"
                                type="text"
                                value={perfil.nombre }
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })} 
                                placeholder="Tu Nombre" />
                        </div>
                        <div className="my-3">
                            <label
                                htmlFor="web"
                                className=" uppercase font-bold text-gray-700 ">Sitio Web</label>

                            <input
                                name="web"
                                id="web"
                                className="w-full border bg-gray-50 rounded-md px-3 py-2 mt-2"
                                type="text"
                                placeholder=" Tu Sitio Web"
                                value={perfil.web }
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })} />
                        </div>
                        <div className="my-3">
                            <label
                                htmlFor="telefono"
                                className=" uppercase font-bold text-gray-700 ">Telefono</label>

                            <input
                                name="telefono"
                                id="telefono"
                                className="w-full border bg-gray-50 rounded-md px-3 py-2 mt-2"
                                type="number"
                                placeholder="Tu Telefono" 
                                value={perfil.telefono }
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}/>
                        </div>
                        <div className="my-3">
                            <label
                                htmlFor="email"
                                className=" uppercase font-bold text-gray-700 ">Email</label>

                            <input
                                name="email"
                                id="email"
                                className="w-full border bg-gray-50 rounded-md px-3 py-2 mt-2"
                                type="email"
                                placeholder="Tu Email"
                                value={perfil.email }
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })} />
                        </div>

                        <input
                            type="submit"
                            value={'GUARDAR CAMBIOS'}
                            className="w-full font-bold border  px-10 py-2 mt-5 rounded-md bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer text-white text-sm lg:w-auto" />

                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil