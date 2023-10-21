import { createContext, useState, useEffect } from "react"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"


const PacienteContext = createContext()
//cada vez que cerramos cecion e iniciamos una nueva el auth(veterinario)se actualiza por lo qeu deberiamos sentrar el useEfect en auth para verificar si hay un cambio se vuelve a ejectar la funcion obtenerPacientes 


const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const {auth} = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('token')
                if (!token) return
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/pacientes', config)
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [auth]);

    const setEdicion = (paciente) => {
       return setPaciente(paciente)
    };

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
               
                // en un PUT pasamos la url, lo que vamos a actualizar y el config
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente,config)
                 
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState )

              
                setPacientes(pacientesActualizado)
                
                
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
    
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
    
                console.log(pacienteAlmacenado)
    
                setPacientes([...pacientes, pacienteAlmacenado])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        return
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('Deseas eliminar este paciente?')
       
        if(confirmar){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

               const {data} = await clienteAxios.delete(`/pacientes/${id}`,config)

               const pacientesActualizado = pacientes.filter(pacientesState =>
                pacientesState._id !== id)

                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }else{

        }
    }
   
    return (
        <PacienteContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}>
            {children}
        </PacienteContext.Provider>
    )


}

export {
    PacientesProvider
}

export default PacienteContext;