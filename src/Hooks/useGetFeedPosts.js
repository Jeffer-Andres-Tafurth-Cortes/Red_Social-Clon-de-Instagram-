import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"
import usePostStore from "../store/postStore"
import useUserProfileStore from '../store/userProfileStore'
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../Firebase/firebase"

// Este custom hook se encarga de obtener los post del feed de la aplicacion, en este caso es el feed de publicaciones que se ven en la barra lateral izquierda
function useGetFeedPosts() { 
  // Se hace uso de un useState para almacenar los post del feed de la aplicacion y tambien se usa el
  // custom hook usePostStore para almacenar las publicaciones
  const [isLoading, setIsLoading] = useState(true)
  const { posts, setPosts} = usePostStore()
  const authUser = useAuthStore((state) => state.user)
  const showToast = useShowToast()
  const { setUserProfile } = useUserProfileStore()

  useEffect(() => {

    // Se ejecuta cuando el usuario se loguea o cambia
    const getFeedPosts = async () => {
      setIsLoading(true)
      if(authUser.following.length === 0) {
        setIsLoading(false)
        setPosts([])
        return
      }

      // Se obtiene la referencia a la coleccion de posts y se crea una query para obtener los posts de los usuarios que estan siguiendo
      const q = query(collection(firestore, 'posts'), where('createdBy', 'in', authUser.following))

      try {
        const querySnapshot = await getDocs(q)
        const feedPosts = []

        querySnapshot.forEach((doc) => {
          feedPosts.push({id: doc.id, ...doc.data()})
        })

        feedPosts.sort((a, b) => b.createdAt - a.createdAt)
        setPosts(feedPosts)
        
      } catch {
        showToast('Error', 'No hay publicaciones recientes', 'error')

      } finally {
        setIsLoading(false)
      }
    }

    if(authUser) {
      getFeedPosts()
    }
  }, [authUser, showToast, setPosts, setUserProfile]);
  
  return { isLoading, posts }
}

export default useGetFeedPosts