import { useState } from "react"
import Formulario from "../Components/Formulario"
import ListaPacientes from "../Components/ListaPacientes"

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  return (

    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold text-sm mx-auto p-3 w-3/5 rounded-md uppercase mb-10 block md:hidden"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >{`${mostrarFormulario ? 'ocultar formulario' : 'mostrar formulario'}`}
      </button>

      <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListaPacientes />
      </div>
    </div>
  )
}

export default AdministrarPacientes