import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useQuery,useMutation } from "react-query";
import { getAlmacenes,crearGrupo } from "@/api/invApi";
import { useRouter } from "next/navigation";


export default function CrearGrupo() {
  const router = useRouter()
  const { isLoading, isError, data:almacenes, error } = useQuery({
    queryKey: ['almacenes'],
    queryFn: getAlmacenes,
  })
  const addGrupoMutation = useMutation({
    mutationFn: crearGrupo,
    onError: (error) => {
        console.error(error.message);
    },
    onSuccess: () =>{
      router.push('/grupo')
    }
  });

  const { control, handleSubmit} = useForm({});

  const onSubmit = (data) => {
    const Almacen= data.almacen && data.almacen.label;
    addGrupoMutation.mutate({
      ...data,
      almacen:Almacen
    })
  };

  if (isLoading) {
    return <span>Loading...</span>
  }
  
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div className="flex justify-center mt-10">
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border rounded w-80'>
    <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700'
          placeholder="Nombre de Grupo"
          variant="outlined" 
          size="small" 
          required/>}
        name="usuario"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      </div>
      <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700'
          placeholder="Contraseña"
          variant="outlined" 
          size="small" 
          required/>}
        name="pass"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      </div>
      <div className='mb-4'>
      <Controller
        name="almacen"
        render={({ field }) => (
          <Select
            {...field}
            options={almacenes}
            placeholder="Almacen"
            required
          />
        )}
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      </div>
      <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700'
          placeholder="Numero Conteo"
          variant="outlined" 
          size="small" 
          required/>}
        name="conteo"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      </div>
      <Button type="submit">Enviar</Button>
      <Button href="/grupo" color="error">CANCELAR</Button>
    </form>
    </div>
  );
};
