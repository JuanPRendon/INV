import { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField,Grid,Checkbox } from "@mui/material";
import { useQuery,useMutation } from "react-query";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { getMaterialesConteo,CrearConteo } from "@/api/invApi";

const options=[
  {
    label:"opcion1",
    value:1
  },
  {
    label:"o2",
    value:2
  },
  {
    label:"o3",
    value:3
  }
]

const schema = yup.object({
  cantidad : yup.number().typeError('requerido').positive('debe ser positivo')
}).required();

export default function Conteo() {
  
  const { control, handleSubmit,formState:{errors} } = useForm({
    resolver: yupResolver(schema)
  });

  const [isLoteChecked, setIsLoteChecked] = useState(false);
  const onSubmit = (data) => {
    const materialId = data.material && data.material.value;
    console.log(data);
  };

  return (
    <div className="flex justify-center mt-10">
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border rounded w-80'>
    <div className='mb-4'>
      <Controller
        name="material"
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={options}
            placeholder="Material"
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
          placeholder="Ubicación"
          variant="outlined" 
          size="small" 
          required/>}
        name="ubicacion"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      </div>
      <Grid container>
      <Grid item xs={2}>
      <div className="mb-4">
        <Controller 
          render={({field}) =>
          <Checkbox 
            {...field} 
            className="border rounded text-gray-700"
            onChange={(e) => setIsLoteChecked(e.target.checked)}/>
          }
          name="lote"
          control={control}
        />
      </div>
      </Grid>
      <Grid item xs={10}>
      <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700 '
          placeholder="Numero Lote"
          variant="outlined"
          disabled={!isLoteChecked}
          size="small" />}
        name="numeroLote"
        control={control}
        defaultValue=""
      />
      </div>
      </Grid>
      </Grid>
      <div className='mb-4'>
      <Controller
        render={({ field }) => 
        <TextField 
          {...field}
          fullWidth
          className='border rounded text-gray-700 '
          placeholder="Cantidad"
          variant="outlined"
          size="small"
          type="number" 
          required/>}
        name="cantidad"
        control={control}
        defaultValue=""
      />
      </div>
      <Button type=" submit">Enviar</Button>
    </form>
    </div>
  );
};
