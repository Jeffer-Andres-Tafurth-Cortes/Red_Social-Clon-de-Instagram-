import { useEffect, useState } from 'react'
import usePostStore from '../store/postStore'
import useShowToast from './useShowToast'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../Firebase/firebase'
import useUserProfileStore from '../store/userProfileStore'

// Este custom hook se encarga de obtener los post del usuario logueado en la aplicacion
function useGetUserPosts() {

  // Se hace uso de un useState para almacenar los post del usuario logueado en la aplicacion y tambien se usa el
  // custom hook usePostStore para almacenar las publicaciones
  const [isLoading, setIsLoading] = useState(true)
  const { posts, setPosts } = usePostStore()
  const showToast = useShowToast()
  const userProfile = useUserProfileStore((state) => state.userProfile)

  // Se utiliza useEffect para obtener las publicaciones del usuario logueado en la aplicacion
  useEffect(() => {
    const getPosts = async() => {

      // Se verifica si hay un usuario logueado en la aplicacion
      if(!userProfile) return
      setIsLoading(true)
      setPosts([])

      try {
        // Se crea una query para obtener las publicaciones del usuario logueado
        const q = query(collection(firestore, 'posts', where('createdBy', '==', userProfile.uid)))
        const querySnapshot = await getDocs(q)

        // Se recorre cada documento de la query y se agrega la publicacion al array de las publicaciones
        const posts = []
        querySnapshot.forEach((doc) => {
          posts.push({...doc.data(), id: doc.id})
        })

        // Se ordenan las publicaciones por fecha de creacion en orden descendiente y se establecen en el state
        posts.sort((a,b) => b.createdAt - a.createdAt)
        setPosts(posts)

      } catch (error) {
        showToast('Error', error.message, 'error')
        setPosts([])

      } finally {
        setIsLoading(false)
      }
    }
    getPosts()
  }, [setPosts, userProfile, showToast]);

  return { isLoading, posts }
}

export default useGetUserPosts