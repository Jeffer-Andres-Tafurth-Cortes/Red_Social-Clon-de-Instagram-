import { Box, Link, Tooltip } from "@chakra-ui/react"
import { CreatePostLogo } from "../../assets/Constants"

function CreatePost() {
  return (
    <>
      <Tooltip hasArrow label={'Create'} placement='right' marginLeft={1} 
        openDelay={500} display={{base: 'block', md: 'none'}}
      >
        <Link display={'flex'} alignItems={'center'} gap={4} _hover={{backgroundColor: 'whiteAlpha.400'}} 
          borderRadius={6} padding={2} width={{base: '10', md: 'full'}} justifyContent={{base: 'center', md: 'flex-start'}}
        >
          <CreatePostLogo size={25} />
          <Box display={{base: 'none', md: 'block'}}>
            Crear
          </Box>
        </Link>
      </Tooltip>
    </>
  )
}

export default CreatePost