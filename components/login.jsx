import { TextField,Button } from "@mui/material";
import { useMutation } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { validateLoginUser } from "@/api/invApi";
import {Alert} from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginUser(){

    const addLoginUserMutation = useMutation({
        mutationFn: validateLoginUser,
      });

      const { control, handleSubmit,formState:{errors} } = useForm({});  

      const onSubmit = (data) =>  {
        addLoginUserMutation.mutate({
          ...data,
        })
      };

      const router = useRouter()
      return (
        <>
        <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit(onSubmit)} >
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
              required
              type="pass"/>}
            name="pass"
            control={control}
            defaultValue=""
          />
          </div>
          <div className="mb-4">
          {addLoginUserMutation.isError ? (
              <Alert severity="error">
              <strong>contraseña incorrecta</strong>
              </Alert>
            ) : null}
          </div>
          <Button type="submit">Enviar</Button>
        </form>
        </div>
        {addLoginUserMutation.isSuccess ? router.push('/table') : null}
        </>
      );
}