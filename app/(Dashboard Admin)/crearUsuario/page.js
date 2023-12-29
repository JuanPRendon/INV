"use client"
import CrearUsuario from "@/components/crearUsuario"
import { QueryClientProvider,QueryClient } from "react-query"

export default function crearGrupo() {
    const queryclient = new QueryClient()
    return (
      <QueryClientProvider client={queryclient}>
        <CrearUsuario />
      </QueryClientProvider>
    )
  }
  