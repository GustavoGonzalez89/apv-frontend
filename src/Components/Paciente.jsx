import usePacientes from "../hooks/usePacientes"

const Paciente = ({ paciente }) => {

    const {setEdicion,eliminarPaciente} = usePacientes()

    const { email, fecha_de_alta, nombre, propietario, sintomas, _id } = paciente

   

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(nuevaFecha)
    }
    

    return (

        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-indigo-800 my-2">Nombre: {''}
                <span className=" font-normal normal-case text-black">{nombre}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-2">Propietario: {''}
                <span className=" font-normal normal-case text-black">{propietario}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-2">Email Contacto: {''}
                <span className=" font-normal normal-case text-black">{email}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-2">Fecha de Alta: {''}
                <span className=" font-normal normal-case text-black">{formatearFecha(fecha_de_alta)}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-2">Sintomas: {''}
                <span className=" font-normal normal-case text-black">{sintomas}</span>
            </p>
            <div className="flex justify-between my-5">
                <button
                    type="button"
                    className=" bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md font-sm uppercase py-2 px-10"
                    onClick={()=>setEdicion(paciente)}>
                    Editar
                </button>
                <button
                    type="button"
                    className=" bg-red-600 hover:bg-red-700 text-white font-bold rounded-md font-sm uppercase py-2 px-10"
                    onClick={() => eliminarPaciente(_id)}>
                    eliminar
                </button>
            </div>
        </div>
    )
}

export default Paciente