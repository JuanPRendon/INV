"use client"
import EditGrupo from "@/components/editGrupo"
import { QueryClientProvider,QueryClient } from "react-query"

export default function editGrupo(props) {
    const queryclient = new QueryClient()
    return (
      <QueryClientProvider client={queryclient}>
        <EditGrupo  datos={props}/>
      </QueryClientProvider>
    )
  }
  