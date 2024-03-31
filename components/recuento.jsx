import { useMemo } from 'react';
import {MaterialReactTable} from 'material-react-table';
import { useQuery } from 'react-query';
import { Button } from '@mui/material';
import { green } from '@mui/material/colors';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
const XLSX = require('xlsx')
import { recuento } from '@/api/invApi';

const Recuento = () => {
    const { data:mat, error,isLoading,isError } = useQuery({
        queryKey: ['mat'],
        queryFn: recuento,
      })

    const handleExport = () =>{
      var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(mat);

      XLSX.utils.book_append_sheet(wb,ws,"Recuento")
      XLSX.writeFile(wb, "Recount.xlsx")
    }
    
      const columns = useMemo(
        () => [
          {
            header: 'Documento',
            accessorKey:'documento',
            enableColumnOrdering: false,
          },
          {
            header: 'Material',
            accessorKey: 'material',
            enableGrouping: false,
            enableColumnOrdering: false,
          },
          {
            header: 'Almacen',
            accessorKey: 'almacen',
            enableColumnOrdering: false

          },
          {
            header: 'SAP',
            accessorKey: 'sap',
            enableGrouping: false,
            enableColumnOrdering: false

          },
          {
            header: 'Conteo 1',
            accessorKey: 'conteo1',
            enableGrouping: false
          },
          {
            header: 'Conteo 2',
            accessorKey: 'conteo2',
            enableGrouping: false
          },
          {
            header: 'Conteo 3',
            accessorKey: 'conteo3',
            enableGrouping: false
          },
          {
            header: 'Diferencia Conteo1',
            accessorKey: 'diferencia1',
            enableGrouping: false
          },
          {
            header: 'Diferencia Conteo2',
            accessorKey: 'diferencia2',
            enableGrouping: false
          },
          {
            header: 'Diferencia Conteo3',
            accessorKey: 'diferencia3',
            enableGrouping: false
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

    return (
        <div className='p-5 m-5 mr-10'>
          <div className='mb-5'>
            <Button onClick={handleExport} sx={{background: green[500], color:'white', p:1,
            '&:hover': {
            backgroundColor: green[800],
            },}} startIcon={<FileDownloadIcon/>} size="small">Descargar</Button>
          </div>
            <MaterialReactTable columns={columns} data={mat} enableGrouping enableColumnOrdering 
              initialState={{columnVisibility:{
                conteo1: false,
                conteo2: false,
                conteo3: false,
                diferencia3: false
              }}}
              defaultColumn={{
                size:50
              }}
            />
        </div>
      )
};



export default Recuento;
