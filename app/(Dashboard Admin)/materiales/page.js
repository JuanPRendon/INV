"use client"

import Materiales from "@/components/materiales"
import { QueryClientProvider,QueryClient } from "react-query"

export default function materiales() {
    const queryclient = new QueryClient()
    return (
      <QueryClientProvider client={queryclient}>
        <Materiales />
      </QueryClientProvider>
    )
  }
  