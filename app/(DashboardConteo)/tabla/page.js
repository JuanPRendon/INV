"use client"
import Tabla from "@/components/tabla"
import { QueryClient,QueryClientProvider } from "react-query"
export default function tabla() {
    const queryclient = new QueryClient()
    return (
        <QueryClientProvider client={queryclient}>
            <Tabla />
        </QueryClientProvider>
    )
  }
  