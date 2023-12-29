import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUsuario, getUsuarios } from "@/api/invApi"
import { useQuery,useMutation,useQueryClient } from "react-query"
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Dialog,DialogContent,DialogActions } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { red,green } from "@mui/material/colors";


export default function Usuarios(){
    const queryclient = useQueryClient()
    const { isLoading, isError, data:usuarios, error } = useQuery({
        queryKey: ['usuarios'],
        queryFn: getUsuarios,
      })
    
    const deleteUsuarioMutation =useMutation({
        mutationFn: deleteUsuario,
        onSuccess: () => {
            alert("Usuario Eliminado")
            queryclient.invalidateQueries("usuario")
        },
        onError: () => {
            alert("No fue posible eliminar el usuario")
        }
    })

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const router = useRouter();

    const handleClose = () => setOpen(false)
    
    const handleOpen = (u) => {
        setOpen(true)
        setId(u.idUsuario)
    }

    const handleEdit = (u) => {
        router.push(`/editUsuario?idUser=${u.idUsuario}&user=${u.nombre}&pass=${u.contraseña}`);
      };

    if (isLoading) return <div>Loading...</div>;
    else if (isError) return <div>{error.message}</div>;
    return(
    <>
        <div className="m-5">
        <Button sx={{background: green[500], color:'white', p:1,
        '&:hover': {
            backgroundColor: green[800],
        },}} startIcon={<AddIcon/>} size="small" href="/crearUsuario">Nuevo</Button>
        </div>
        <div className="m-5">
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ACTIONS</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>USUARIO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios.map((usuario)=>(
                        <>
                        <TableRow key={usuario.idUsuario}>
                            <TableCell width={200}>
                                <Button onClick={() => handleEdit(usuario)}><EditIcon fontSize="small" /></Button>
                                <Button onClick={() => handleOpen(usuario)}><DeleteIcon fontSize="small" sx={{color : red[500]}}/></Button>
                                <ShowModal />
                            </TableCell>
                            <TableCell>{usuario.idUsuario}</TableCell>
                            <TableCell>{usuario.nombre}</TableCell>
                        </TableRow>
                        </> 
                    ))}
                </TableBody>
            </Table>
        </TableContainer>   
        </div>   
    </> 
    )
    function ShowModal(){
        return(
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <DialogContent>Desea eliminar el grupo con ID <strong>{id}</strong></DialogContent>
            <DialogActions>
                <Button onClick={() =>{ 
                    handleClose(),
                    deleteUsuarioMutation.mutate({id})    
                }}>Aceptar</Button>
                <Button onClick={handleClose} color="error">Cancelar</Button>
            </DialogActions>
            </Dialog>
        )
    }
}

