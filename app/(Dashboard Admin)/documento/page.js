"use client"
import Documento from "@/components/transferList"
import { QueryClientProvider,QueryClient } from "react-query"

export default function documento() {
    const queryclient = new QueryClient()
    return (
      <QueryClientProvider client={queryclient}>
        <Documento />
      </QueryClientProvider>
    )
  }
  