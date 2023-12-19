import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteGrupo, getGrupos} from "@/api/invApi"
import { useQuery,useMutation,useQueryClient } from "react-query"
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Dialog,DialogContent,DialogActions } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { red,green } from "@mui/material/colors";


export default function TableAdmin(){
    const queryclient = useQueryClient()
    const { isLoading, isError, data:grupos, error } = useQuery({
        queryKey: ['grupos'],
        queryFn: getGrupos,
      })
    
    const deleteGrupoMutation =useMutation({
        mutationFn:deleteGrupo,
        onSuccess: () => {
            alert("Grupo Eliminado")
            queryclient.invalidateQueries("conteos")
        },
        onError: () => {
            alert("No fue posible eliminar el grupo")
        }
    })

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const router = useRouter();

    const handleClose = () => setOpen(false)
    
    const handleOpen = (g) => {
        setOpen(true)
        setId(g.idGrupo)
    }

    const handleEdit = (g) => {
        router.push(`/editGrupo?idGrupo=${g.idGrupo}&usuario=${g.nombre}&pass=${g.contraseña}&almacen=${g.almacen}&conteo=${g.conteo}`);
      };

    if (isLoading) return <div>Loading...</div>;
    else if (isError) return <div>{error.message}</div>;
    
    return(
    <>
        <div className="m-5">
        <Button sx={{background: green[500], color:'white', p:1,
        '&:hover': {
            backgroundColor: green[800],
        },}} startIcon={<AddIcon/>} size="small" href="/crearGrupo">Nuevo</Button>
        </div>
        <div className="m-5">
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ACTIONS</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>USUARIO</TableCell>
                        <TableCell>ALMACEN</TableCell>
                        <TableCell>CONTEO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {grupos.map((grupo)=>(
                        <>
                        <TableRow key={grupo.idGrupo}>
                            <TableCell width={200}>
                                <Button onClick={() => handleEdit(grupo)}><EditIcon fontSize="small" /></Button>
                                <Button onClick={() => handleOpen(grupo)}><DeleteIcon fontSize="small" sx={{color : red[500]}}/></Button>
                                <ShowModal />
                            </TableCell>
                            <TableCell>{grupo.idGrupo}</TableCell>
                            <TableCell>{grupo.nombre}</TableCell>
                            <TableCell>{grupo.almacen}</TableCell>
                            <TableCell>{grupo.conteo}</TableCell>
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
                    deleteGrupoMutation.mutate({id})    
                }}>Aceptar</Button>
                <Button onClick={handleClose} color="error">Cancelar</Button>
            </DialogActions>
            </Dialog>
        )
    }
}

