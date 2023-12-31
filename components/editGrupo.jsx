import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useMutation } from "react-query";
import { editGrupo } from "@/api/invApi";
import { useRouter } from "next/navigation";


export default function EditGrupo(props) {
  const router = useRouter()
  const updateGrupoMutation = useMutation({
    mutationFn: editGrupo,
  });

  const { control, handleSubmit,formState:{errors}} = useForm({});

  const onSubmit = (data) =>{
    updateGrupoMutation.mutate({
      ...data
    })
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
          placeholder="ID Grupo"
          variant="outlined" 
          size="small" 
          required
          disabled/>}
        name="idGrupo"
        control={control}
        rules={{ required: true }}
        defaultValue={props.datos.searchParams.idGrupo}
      />
      </div>
    <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700'
          placeholder="Usuario"
          variant="outlined" 
          size="small" 
          required/>}
        name="usuario"
        control={control}
        rules={{ required: true }}
        defaultValue={props.datos.searchParams.usuario}
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
        defaultValue={props.datos.searchParams.pass}
      />
      </div>
      <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700'
          placeholder="Almacen"
          variant="outlined" 
          size="small" 
          required/>}
        name="almacen"
        control={control}
        rules={{ required: true }}
        defaultValue={props.datos.searchParams.almacen}
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
        defaultValue={props.datos.searchParams.conteo}
      />
      </div>
      <Button type="submit">Enviar</Button>
      <Button color="error" href="/grupo">Cancelar</Button>
    </form>
    {updateGrupoMutation.isSuccess ? router.push('/grupo'): null}
    </div>
  );
};
