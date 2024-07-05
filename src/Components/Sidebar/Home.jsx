import { Box, Link, Tooltip } from "@chakra-ui/react"
import { AiFillHome } from "react-icons/ai"
import { Link as RouterLink} from 'react-router-dom'

function Home() {
  return (
    <>
      <Tooltip hasArrow label={'Home'} placement='right' marginLeft={1} 
        openDelay={500} display={{base: 'block', md: 'none'}}
      >
        <Link display={'flex'} to={'/'} as={RouterLink} alignItems={'center'} gap={4} _hover={{backgroundColor: 'whiteAlpha.400'}} 
          borderRadius={6} padding={2} width={{base: '10', md: 'full'}} justifyContent={{base: 'center', md: 'flex-start'}}
        >
          <AiFillHome size={25} />
          <Box display={{base: 'none', md: 'block'}}>
            Inicio
          </Box>
        </Link>
      </Tooltip>
    </>
  )
}

export default Home