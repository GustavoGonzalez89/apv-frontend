import { useContext } from "react"
import authContext from "../context/authPovider"

const useAuth = () =>{
    return useContext(authContext)
}

export default useAuth