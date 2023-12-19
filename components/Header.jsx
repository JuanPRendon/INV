import { Button,Toolbar,AppBar,Box } from '@mui/material';

const Header = () => {
  return (
      <AppBar position="static">
        <Toolbar>
          <Box display="flex">
          <Button size='small' sx={{m:2, color:'white'}} href='/tabla'>Tabla</Button>
          <Button size='small' sx={{m:2, color:'white'}} href='/conteo'>Conteo</Button>
          </Box>
          <Box display="flex" justifyContent="flex-end"  alignItems="flex-end" sx={{width:1}}>
          <Button size='small' sx={{m:2, color:'white'}} href='/loginGrupo'>logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
      
  )
}

export default Header