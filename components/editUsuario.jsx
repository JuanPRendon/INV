import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useMutation } from "react-query";
import { editGrupo, editUsuario } from "@/api/invApi";
import { useRouter } from "next/navigation";


export default function EditGrupo(props) {
  const router = useRouter()
  const updateUserMutation = useMutation({
    mutationFn: editUsuario,
  });

  const { control, handleSubmit,formState:{errors}} = useForm({});

  const onSubmit = (data) =>{
    updateUserMutation.mutate({
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
          placeholder="ID Usuario"
          variant="outlined" 
          size="small" 
          required
          disabled/>}
        name="idUser"
        control={control}
        rules={{ required: true }}
        defaultValue={props.datos.searchParams.idUser}
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
        name="user"
        control={control}
        rules={{ required: true }}
        defaultValue={props.datos.searchParams.user}
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
      <Button type="submit">Enviar</Button>
      <Button color="error" href="/usuario">Cancelar</Button>
    </form>
    {updateUserMutation.isSuccess ? router.push('/usuario'): null}
    </div>
  );
};
