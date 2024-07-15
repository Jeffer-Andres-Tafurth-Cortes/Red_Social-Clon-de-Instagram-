import { Avatar, Box, Link, Tooltip } from "@chakra-ui/react"
import { Link as RouterLink } from 'react-router-dom'
import useAuthStore from "../../store/authStore"

function ProfileLink() {

  const authUser = useAuthStore((state) => state.user)

  return (
    <>
      <Tooltip hasArrow label={'Profile'} placement='right' marginLeft={1} openDelay={500} display={{base: 'block', md: 'none'}}>
        <Link display={'flex'} to={`/${authUser?.userName}`} as={RouterLink} alignItems={'center'} gap={4} borderRadius={6} padding={2}
          _hover={{backgroundColor: 'whiteAlpha.400'}} width={{base: '10', md: 'full'}} justifyContent={{base: 'center', md: 'flex-start'}}
        >
          <Avatar size={'sm'} src={authUser?.profilePicURL || ''} />
          <Box display={{base: 'none', md: 'block'}}>
            Perfil
          </Box>
        </Link>
      </Tooltip>
    </>
  )
}

export default ProfileLink