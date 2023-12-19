import { useMutation } from "react-query";
import { validateLogin } from "@/api/invApi";
import { Alert,AlertTitle } from "@mui/material";
export default function Sdf() {
    const mutation = useMutation({
      mutationFn: validateLogin
    })

    return (
      <div>
        {mutation.isPending ? (
          'Adding todo...'
        ) : (
          <>
            {mutation.isError ? (
              <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>check it out!</strong>
              </Alert>
            ) : null}
  
            {mutation.isSuccess ? <div>Todo added!</div> : null}
  
            <button
              onClick={() => {
                mutation.mutate({ title: 'Do Laundry' })
              }}
            >
              Create Todo
            </button>
          </>
        )}
      </div>
    )
  }