"use client"
import Usuarios from "@/components/usuarios"
import { QueryClient,QueryClientProvider } from "react-query"
export default function Usuario(){
    const queryclient = new QueryClient()
    return(
        <QueryClientProvider client={queryclient}>
            <Usuarios />
        </QueryClientProvider>
    )
}