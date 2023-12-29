import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useMutation } from "react-query";
import { crearUsuario } from "@/api/invApi";
import { useRouter } from "next/navigation";


export default function CrearUsuario() {
  const router = useRouter()

  const addUserMutation = useMutation({
    mutationFn: crearUsuario,
    onError: (error) => {
        console.error(error.message);
    },
    onSuccess: () =>{
      router.push('/usuario')
    }
  });

  const { control, handleSubmit} = useForm({});

  const onSubmit = (data) => {
    addUserMutation.mutate({
      ...data,
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
          placeholder="Nombre del usuario"
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
      <Button type="submit">Enviar</Button>
      <Button href="/grupo" color="error">CANCELAR</Button>
    </form>
    </div>
  );
};
