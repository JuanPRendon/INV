import { useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import { useMemo } from 'react';
import {MaterialReactTable} from 'material-react-table';
import { useQuery,useMutation,useQueryClient } from 'react-query';
import { green } from "@mui/material/colors";
import { getMateriales, registroMateriales } from "@/api/invApi";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function Materiales(){
  const queryclient = useQueryClient()
  const { data:materiales,isLoading,isError } = useQuery({
    queryKey: ['materiales'],
    queryFn: getMateriales,
  })

  const registroMaterialesMutation =useMutation({
    mutationFn:registroMateriales,
    onSuccess: () => {
        alert("Materiales Cargados Correctamente")
        queryclient.invalidateQueries("materiales")
    },
    onError: () => {
        alert("No fue posible cargar los materiales")
    }
})

  const [file,setFile] = useState()

  const columns = useMemo(
    () => [
      {
        header: 'Material',
        accessorKey: 'idMaterial',
        enableGrouping: false,
      },
      {
        header: 'Nombre',
        accessorKey: 'nombre',
        enableGrouping: false,
      },
      {
        header: 'Cantidad',
        accessorKey: 'cantidad',
        enableGrouping: false,
      },
      {
        header: 'Almacen',
        accessorKey: 'almacen',
      },
    ],
    [],
  ); 
if (isLoading) {
  return <p>Cargando...</p>;
}

if (isError) {
  return <p>Hubo un error al cargar los datos.</p>;
}

  const Submit = async(e) =>{
    e.preventDefault();
    const formData = new FormData()
    formData.append('file', file)
    console.log(file);
    // await registroMateriales(formData)
    registroMaterialesMutation.mutateAsync(formData)
  }


  return(
    <div className='p-5 m-5 mr-10'>
      <div className="mb-5">
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" onChange={(e) => setFile(e.target.files[0])} accept=".csv"/>
        </Button>
        <Button sx={{background: green[500], color:'white', p:1, m:1,
        '&:hover': {
            backgroundColor: green[800],
        },}} endIcon={<SendIcon/>} size="small" type="submit" onClick={Submit}>Enviar</Button>
      </div>
      <MaterialReactTable columns={columns} data={materiales} enableGrouping/>
    </div>
  )
}