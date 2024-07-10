import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../Firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

// Este custom hook tendra la logica de aumentar el numero visible de likes que se de en alguna publicacion
function useLikePost(post) {
  
  const [isUpdating, setIsUpdating] = useState(false)
  const authUser = useAuthStore((state) => state.user)
  const [likes, setLikes] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid))
  const showToast = useShowToast()

  // Esta funcion sera la encarga ya sea de agregar el like o quitar el like
  const handleLikePost = async () => {
    if (isUpdating) return

    // Se verifica que el usuario tenga la sesion iniciada en la aplicacion para poder ejecutar la accion
    if(!authUser) return showToast('Error', 'Deje iniciar sesion para darle like a una publicacion', 'error')
    setIsUpdating(true)

    try {
      const postRef = doc(firestore, 'posts', post.id)
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.id)
      })
      setIsLiked(!isLiked)
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1)
    } catch (error) {
      showToast('Error', error.message, 'error')

    } finally {
      setIsUpdating(false)

    }
  }

  return {isLiked, likes, handleLikePost}

}

export default useLikePost