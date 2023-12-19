"use client"
import Conteo from "@/components/conteo"
import { QueryClient,QueryClientProvider } from "react-query"

export default function conteo() {
    const queryclient = new QueryClient()
    return (
        <QueryClientProvider client={queryclient}>
            <Conteo />
        </QueryClientProvider>
    )
  }
  