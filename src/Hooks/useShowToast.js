import { useToast } from "@chakra-ui/react"
import { useCallback } from "react";

// Este componente el la logica de cartel de acuerdo si algo esta correoto o contiene un error cuando se ejecute algo en la aplicacion
function useShowToast() {

  const toast = useToast()

  // Se usa un callback para evitar un loop infinito
  const showToast = useCallback((title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    })
  }, [toast])

  return showToast;
}

export default useShowToast