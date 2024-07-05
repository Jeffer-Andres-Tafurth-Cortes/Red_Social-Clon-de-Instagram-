import { Box, Link, Tooltip } from "@chakra-ui/react"
import { NotificationsLogo} from "../../assets/Constants"

function Notifications() {
  return (
    <>
      <Tooltip hasArrow label={'Notifications'} placement='right' marginLeft={1} 
        openDelay={500} display={{base: 'block', md: 'none'}}
      >
        <Link display={'flex'} alignItems={'center'} gap={4} _hover={{backgroundColor: 'whiteAlpha.400'}} 
          borderRadius={6} padding={2} width={{base: '10', md: 'full'}} justifyContent={{base: 'center', md: 'flex-start'}}
        >
          <NotificationsLogo size={25} />
          <Box display={{base: 'none', md: 'block'}}>
            Notificaciones
          </Box>
        </Link>
      </Tooltip>
    </>
  )
}

export default Notifications