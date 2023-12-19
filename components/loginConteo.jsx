import { TextField,Button } from "@mui/material";
import Select from "react-select";
import { useMutation } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { validateLoginGrupo,getLoginGrupos } from "@/api/invApi";
import { useQuery } from "react-query";
import {Alert} from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginConteo(){
    const { isLoading, isError, data:grupo, error, status } = useQuery({
      queryKey: ['grupo'],
      queryFn: getLoginGrupos,
    })
    const addLoginMutation = useMutation({
        mutationFn: validateLoginGrupo,
      });

      const { control, handleSubmit,formState:{errors} } = useForm({});  

      const onSubmit = (data) =>  {
        const grupoId = data.grupo && data.grupo.label;
        addLoginMutation.mutate({
          ...data,
          grupo : grupoId
        })
      };

      const router = useRouter()
      return (
        <>
        <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit(onSubmit)} >
        <div className='mb-4'>
          <Controller
          name="grupo"
          render={({ field }) => (
            <Select
              {...field}
              options={grupo}
              placeholder="grupo"
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
              placeholder="pass"
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
          {addLoginMutation.isError ? (
              <Alert severity="error">
              <strong>contraseña incorrecta</strong>
              </Alert>
            ) : null}
          </div>
          <Button type="submit">Enviar</Button>
        </form>
        </div>
        {addLoginMutation.isSuccess ? router.push('/conteo') : null}
        </>
      );
}