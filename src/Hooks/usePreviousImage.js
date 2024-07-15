  import { useState } from'react';
import useShowToast from './useShowToast'

// Este componente ejecuta la logica empleada cuando se cambia la foto de perfil en el componente EditProfile.jsx
function usePreviousImage() {

  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast()
  const maxFileSizeInBytes = 2 * 1024 * 1024 // El tamaño de la imagen maximo debe der ser 2MB

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if(file && file.type.startsWith('image/')){

      // Este If verifica el tamaño de la imagen
      if (file.size > maxFileSizeInBytes) {
        showToast('Error', 'El tamaño de la imagen es demasiado grande. El limite es de 2MB.', 'error')
        setSelectedFile(null)
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedFile(reader.result)
      }
      reader.readAsDataURL(file)
      
    } else {
      showToast('Error', 'La imagen seleccionada no es válida.', 'error')
      setSelectedFile(null)
    }
  }

  return { selectedFile, handleImageChange, setSelectedFile }
}

export default usePreviousImage