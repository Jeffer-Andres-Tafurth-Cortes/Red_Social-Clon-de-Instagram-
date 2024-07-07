import { useState } from "react"
import useShowToast from './useShowToast'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../Firebase/firebase'

// Este custom hook va a tener la logica para buscar un usuario en la aplicacion, se usa en el componenten 'Search.jsx'
function useSearchUser() {

  // El primer useState sera un loading que se ejecuta mientras encuentra el usuario descrito
  const [isLoading, setIsLoading] = useState(false);

  // El segundo useState sera el nombre del usuario que el usuario quiere buscar
  const [user, setUser] = useState(null)

  // La constante showToast es para mostrar carteles de errores si llegan a haber en el uso del buscador
  const showToast = useShowToast()

  const getUserProfile = async(userName) => {
    setIsLoading(true)
    setUser(null)
    try {
      const q = query(collection(firestore, 'users'), where('userName', '==', userName))

      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {

        // Si no hay resultados no retorna nada y se muestra un cartel
        return showToast('Error', 'Usuario no encontrado', 'error')
      } 
        
      // Si hay resultados, se establece el usuario a la primera coincidencia
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
      
    } catch (error) {
      showToast('Error', error.message, 'error')
      setUser(null)
    
    } finally {
      // Se cambia el estado del loading a false para terminar de buscar al usuario
      setIsLoading(false)
    }
  }

  return { isLoading, user, setUser, getUserProfile }

}

export default useSearchUser