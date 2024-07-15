import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../Firebase/firebase";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

// Este custom hook va a manejar la logica para obtener los usuarios sugeridos en la aplicacion
function useGetSuggestedUsers() {

  const [isLoading, setIsLoading] = useState(true)
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const authUser = useAuthStore((state) => state.user)
  const showToast = useShowToast()

  // Se ejecuta cuando el usuario se loguea o cambia
  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        const usersRef = collection(firestore, 'users')
        const q = query(
          usersRef, where('uid', 'not-in', [authUser.uid, ...authUser.following]), orderBy('uid'), limit(3)
        )

        const querySnapshot = await getDocs(q)
        const users = []

        querySnapshot.forEach((doc) => {
          users.push({...doc.data(), id: doc.id})
        });

        setSuggestedUsers(users)
        
      } catch (error) {
        showToast('Error', error.message, 'error')
        
      } finally {
        setIsLoading(false)
      }
    }

    if(authUser) getSuggestedUsers()
  }, [authUser, showToast]);

  return { isLoading, suggestedUsers }
  
}

export default useGetSuggestedUsers