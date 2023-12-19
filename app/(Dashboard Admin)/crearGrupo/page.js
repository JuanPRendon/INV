"use client"
import CrearGrupo from "@/components/crearGrupo"
import { QueryClientProvider,QueryClient } from "react-query"

export default function crearGrupo() {
    const queryclient = new QueryClient()
    return (
      <QueryClientProvider client={queryclient}>
        <CrearGrupo />
      </QueryClientProvider>
    )
  }
  