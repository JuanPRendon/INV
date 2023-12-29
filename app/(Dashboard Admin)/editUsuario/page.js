"use client"
import EditUsuario from "@/components/editUsuario"
import { QueryClientProvider,QueryClient } from "react-query"

export default function editGrupo(props) {
    const queryclient = new QueryClient()
    return (
      <QueryClientProvider client={queryclient}>
        <EditUsuario  datos={props}/>
      </QueryClientProvider>
    )
  }
  