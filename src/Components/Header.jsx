import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"





const Header = () => {

    const { cerrarSesion} = useAuth()

    return (
        <header className="py-10 bg-indigo-600" >
            <div className="container mx-auto flex flex-col  lg:justify-between lg:items-center lg:flex-row text-center">
                <h1 className="font-black text-2xl text-indigo-200">Administrador de Pacientes de {''} <span className="text-white">Veterinaria</span>
                </h1>
                <nav className=" flex  flex-col gap-4 items-center mt-5 lg:mt-0 lg:flex-row">
                    <Link to="/admin" className="text-white text-sm uppercase font-bold">Pacientes
                    </Link>
                    <Link to="/admin/perfil" className="text-white text-sm uppercase font-bold">Perfil
                    </Link>
                    <button
                        type="button"
                        className="text-white text-sm uppercase font-bold"
                        onClick={cerrarSesion}
                        >Cerrar Sesion
                    </button>
                </nav>
             
            </div>

        </header>
    )
}

export default Header