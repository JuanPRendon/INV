"use client"
import Recuento from "@/components/recuento"
import { QueryClient,QueryClientProvider } from "react-query"
export default function Table() {
    const queryclient = new QueryClient()
    return (
      <QueryClientProvider client={queryclient}>
        <Recuento />
      </QueryClientProvider>
    )
  }
  