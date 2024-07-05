import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../Firebase/firebase"
import useShowToast from "./useShowToast"
import useAuthStore from "../store/authStore"

// Este custom hook 'useLogOut' sera la logica empleada el el componente 'Sidebar.jsx' en el icono de salir y/o cerrar sesion de la cuenta
// en al aplicacion, devolviendonos a la pagina de autenticacion 
function useLogOut() {

  const [signOut, isLogingOut, error] = useSignOut(auth)
  const showToast = useShowToast()
  const logoutUser = useAuthStore((state) => state.logout)

  const handleLogOut = async() => {
    try {
      await signOut()
      localStorage.removeItem('user-info')
      logoutUser()

    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }

  return {handleLogOut, isLogingOut, error}
}

export default useLogOut