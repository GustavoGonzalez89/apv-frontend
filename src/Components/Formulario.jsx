import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"





const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [fecha,setFecha] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const { guardarPaciente, paciente } = usePacientes()

    //para saber cuando el objeto paciente tiene uno paciente cargado colocamos un useEffect, pasandole una dependencia va a estar observando los cambios en el mismo (State)
    useEffect(() => { 
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setFecha(paciente.fecha_de_alta)
            setEmail(paciente.email)
            setSintomas(paciente.sintomas)
            setId(null)
        }
    }, [paciente])

    const [alerta, setAlerta] = useState({})

    const handleSubmit = e => {
        e.preventDefault()
        // Validar formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return;
        }

        guardarPaciente({ nombre, propietario, email, fecha, sintomas,id})

        setAlerta({
            msg: 'Guardado Correctamente'
        })

        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
    }

    const { msg } = alerta

    return (
        <>
            <h2 className="text-center font-black text-3xl">Administrador de Pacientes</h2>

            <p className="text-xl text-center mt-5 mb-10">
                Agrega tus pacientes y  {''}<span className="text-indigo-600 font-bold"> Administralos</span>
            </p>


            <form
                className="bg-white py-10 px-5 mb-10 lg:mb-7 rounded-sm shadow-lg"
                onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        className="text-gray-700 uppercase block font-bold"
                        htmlFor="mascota"
                    >Nombre </label>
                    <input
                        type="text"
                        id="mascota"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label
                        className="text-gray-700 uppercase font-bold"
                        htmlFor="propietario"
                    >Nombre Propietario</label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="Nombre Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label
                        className="text-gray-700 uppercase font-bold"
                        htmlFor="email"
                    >Email Propietario</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label
                        className="text-gray-700 uppercase font-bold"
                        htmlFor="fecha"
                    >Fecha Alta</label>
                    <input
                        type="date"
                        id="fecha"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label
                        className="text-gray-700 uppercase font-bold"
                        htmlFor="sintomas"
                    >Sintomas</label>
                    <textarea
                        type="message"
                        placeholder="Describe los Sintomas"
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)} />
                </div>
                <input
                    type="submit"
                    value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
                    className="bg-indigo-600 w-full py-2 px-6 rounded-md mt-5 text-white font-bold uppercase  text-sm hover:cursor-pointer hover:bg-indigo-700 transition-colors" />

            </form>
            {msg && <Alerta
                alerta={alerta} />}
        </>

    )
}

export default Formulario
