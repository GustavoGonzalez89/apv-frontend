import PacienteContext from "../context/PacientesProvider"
import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"

const ListaPacientes = () => {
  const { pacientes } = usePacientes()
  return (
    <>
      {pacientes.length ?
        (
          <>
            <h2 className="text-center font-black text-3xl">Listado Pacientes</h2>

            <p className="text-xl text-center mt-5 md:mb-20 lg:mb-10">
              Administra tus {''}<span className="text-indigo-600 font-bold"> Pacientes y Citas</span>
            </p>

            {pacientes.map( paciente => (
              <Paciente 
                key={paciente._id}
                paciente = {paciente}
               />
            ))}
          </>
        ) :
        (
          <>
            <h2 className="text-center font-black text-3xl">No hay pacientes</h2>

            <p className="text-xl text-center mt-5 mb-10">
              Comienza agregando pacientes {''}<span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
            </p>
          </>
        )}
    </>
  )
}
export default ListaPacientes