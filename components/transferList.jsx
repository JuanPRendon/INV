import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from '@mui/material';
import { useQuery } from "react-query";
import { getMaterialesDocumento,getMateriales } from "@/api/invApi";
import Select from 'react-select';

const options = [
  { value: '1', label: 'Chocolate' },
  { value: '2', label: 'Strawberry' },
  { value: '3', label: 'Vanilla' },
  { value: '4', label: 'Vanipla' }
];

export default function Documento() {
  const { isLoading, isError, data:MaterialesDoc, error } = useQuery({
    queryKey: ['MaterialesDoc'],
    queryFn: getMaterialesDocumento,
  })
  const { control, handleSubmit} = useForm({});

  const onSubmit = (data) => {
    const materialId = data.material && data.material.value;
    console.log(data);
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
    <div className="mb-4">
    <Controller
        name="materialesDoc"
        render={({ field }) => (
          <Select
            {...field}
            options={MaterialesDoc}
            placeholder="Material"
            required
            isMulti
          />
        )}
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
    </div>
    <Button type=" submit">Enviar</Button>
    </form>
    </div>
  );
}
