import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteConteo, getConteo } from "@/api/invApi"
import { useQuery,useMutation,useQueryClient } from "react-query"
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Dialog,DialogContent,DialogActions } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { red } from "@mui/material/colors";


export default function Tabla(){
    const queryclient = useQueryClient()
    const { isLoading, isError, data:conteos, error } = useQuery({
        queryKey: ['conteos'],
        queryFn: getConteo,
      })
    
    const DeleteConteoMutation = useMutation({
        mutationFn: deleteConteo,
        onSuccess: () => {
            queryclient.invalidateQueries("conteos")
        }
    })
    
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const router = useRouter();

    const handleClose = () => setOpen(false)
    
    const handleOpen = (c) => {
        setOpen(true)
        setId(c.idConteo)
    }

    const handleEdit = (c) => {
        router.push(`/editConteo?idConteo=${c.idConteo}&material=${c.material}&ubicacion=${c.ubicacion}&lote=${c.numeroLote}&cantidad=${c.cantidad}&almacen=${c.almacen}&grupo=${c.nombre}`);
      };

    if (isLoading) return <div>Loading...</div>;
    else if (isError) return <div>{error.message}</div>;
    
    return(
        <div className="m-5">
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ACTIONS</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>MATERIAL</TableCell>
                        <TableCell>UBICACION</TableCell>
                        <TableCell>LOTE</TableCell>
                        <TableCell>CANTIDAD</TableCell>
                        <TableCell>ALMACEN</TableCell>
                        <TableCell>GRUPO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {conteos.map((conteo)=>(
                        <>
                        <TableRow key={conteo.idConteo}>
                            <TableCell>
                                <Button onClick={() => handleEdit(conteo)}><EditIcon fontSize="small" /></Button>
                                <Button onClick={() => handleOpen(conteo)}><DeleteIcon fontSize="small" sx={{color : red[500]}}/></Button>
                                <ShowModal/>
                            </TableCell>
                            <TableCell>{conteo.idConteo}</TableCell>
                            <TableCell>{conteo.material}</TableCell>
                            <TableCell>{conteo.ubicacion}</TableCell>
                            <TableCell>{conteo.numeroLote}</TableCell>
                            <TableCell>{conteo.cantidad}</TableCell>
                            <TableCell>{conteo.almacen}</TableCell>
                            <TableCell>{conteo.nombre}</TableCell>
                        </TableRow>
                        </> 
                    ))}
                </TableBody>
            </Table>
        </TableContainer>   
        </div>    
    )
    function ShowModal(){
        return(
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <DialogContent>Desea eliminar el conteo con ID <strong>{id}</strong></DialogContent>
            <DialogActions>
                <Button onClick={() =>{ 
                    handleClose(),
                    DeleteConteoMutation.mutate({id})    
                }}>Aceptar</Button>
                <Button onClick={handleClose} color="error">Cancelar</Button>
            </DialogActions>
            </Dialog>
        )
    }
}

