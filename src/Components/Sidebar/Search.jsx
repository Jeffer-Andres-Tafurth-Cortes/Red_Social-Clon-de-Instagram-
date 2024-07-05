import { Box, Link, Tooltip } from "@chakra-ui/react"
import { SearchLogo } from "../../assets/Constants"

function Search() {
  return (
    <>
      <Tooltip hasArrow label={'Search'} placement='right' marginLeft={1} 
        openDelay={500} display={{base: 'block', md: 'none'}}
      >
        <Link display={'flex'} alignItems={'center'} gap={4} _hover={{backgroundColor: 'whiteAlpha.400'}} 
          borderRadius={6} padding={2} width={{base: '10', md: 'full'}} justifyContent={{base: 'center', md: 'flex-start'}}
        >
          <SearchLogo size={25} />
          <Box display={{base: 'none', md: 'block'}}>
            Buscar
          </Box>
        </Link>
      </Tooltip>
    </>
  )
}

export default Search