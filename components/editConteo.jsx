import { useForm, Controller } from "react-hook-form";
import { Button, TextField} from "@mui/material";
import { useMutation } from "react-query";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { editConteo } from "@/api/invApi";
import { useRouter } from "next/navigation";


const schema = yup.object({
  cantidad : yup.number().typeError('requerido').positive('debe ser positivo')
}).required();

export default function EditConteo(props) {
  const router = useRouter()
  const updateConteoMutation = useMutation({
    mutationFn: editConteo,
  });

  const { control, handleSubmit,formState:{errors} } = useForm({
    resolver: yupResolver(schema)
  });
  
  
  const onSubmit = (data) => {
   updateConteoMutation.mutate({
    ...data
   })
  };
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
          variant="outlined" 
          size="small" 
          required
          disabled/>}
        name="idConteo"
        control={control}
        rules={{ required: true }}
        defaultValue={props.datos.searchParams.idConteo}
      />
      </div>
      <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700 '
          variant="outlined"
          size="small"
          label="Material"
          required
          disabled/>}
        name="material"
        control={control}
        defaultValue={props.datos.searchParams.material} 
      />
      </div>
      <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700'
          variant="outlined" 
          size="small" 
          required
          label="Ubicación"
          />}
        name="ubicacion"
        control={control}
        rules={{ required: true }}
        defaultValue={props.datos.searchParams.ubicacion}
      />
      </div>
      <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700'
          variant="outlined" 
          size="small" 
          required
          label="Numero Lote"
          />}
        name="lote"
        control={control}
        rules={{ required: true }}
        defaultValue={props.datos.searchParams.lote}
      />
      </div>
      <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700'
          variant="outlined" 
          size="small" 
          required
          label="Cantidad"
          type="number"
          />}
        name="cantidad"
        control={control}
        rules={{ required: true }}
        defaultValue={props.datos.searchParams.cantidad}
      />
      <p className="text-red-600">{errors.cantidad?.message}</p>
      </div>
      <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700'
          variant="outlined" 
          size="small" 
          required
          label="Almacen"
          disabled/>}
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
          variant="outlined" 
          size="small" 
          required
          label="Grupo"
          disabled/>}
        name="grupo"
        control={control}
        rules={{ required: true }}
        defaultValue={props.datos.searchParams.grupo}
      />
      </div>
      <Button type="submit">Enviar</Button>
      <Button color="error" href="/tabla">Cancelar</Button>
    </form>
    {updateConteoMutation.isSuccess ? router.push('/tabla'): null}
    </div>
  );
};
