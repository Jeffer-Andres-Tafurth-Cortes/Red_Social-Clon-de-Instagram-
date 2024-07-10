import { useState } from "react"
import useShowToast from "./useShowToast"
import useAuthStore from "../store/authStore"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { firestore } from "../Firebase/firebase"
import usePostStore from "../store/postStore"

// Este custom hook tendra la logica para agregar comentarios a alguna publicacion dentro de la aplicacion
function usePostComment() {
  const [isCommenting, setIsCommenting] = useState(false)
  const showToast = useShowToast()
  const authUser = useAuthStore(state => state.user)
  const addComment = usePostStore(state => state.addComment)

  const handlePostComment = async () => {
    if (isCommenting) return 

    if(!authUser) return showToast('Error', 'Debes iniciar sesion para comentar', 'error')

    // Los comentarios estaran formados de la siguiente manera: comentario, fecha, autor y id de la publicacion
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId
    }

    setIsCommenting(true)
    try {
      // Aqui va la logica para agregar el comentario a la base de datos
      await updateDoc(doc(firestore, 'posts', postId), {
        comments: arrayUnion(newComment)
      })
      addComment(postId, newComment)

      
      // Luego mostrar un mensaje de éxito al usuario
      showToast('Comentario agregado exitosamente!')
      
    } catch (error) {
      showToast('Error', error.message, 'error')
      
    } finally{
      setIsCommenting(false)
    }
  } 

  return { handlePostComment, isCommenting }

}

export default usePostComment