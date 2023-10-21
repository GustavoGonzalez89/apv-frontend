import { Link } from "react-router-dom"

const AdminNav = () => {
  return (
    <nav className="flex gap-5 justify-center md:justify-end">
        <Link
        className="fond-bold uppercase text-gray-500"
        to={'/admin/perfil'}>
            Perfil
        </Link>
        <Link
        className="fond-bold uppercase text-gray-500"
        to={'/admin/cambiar-password'}>
            Cambiar Password
        </Link>
    </nav>
  )
}

export default AdminNav