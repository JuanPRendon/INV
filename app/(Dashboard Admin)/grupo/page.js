"use client"
import TableAdmin from "@/components/table"
import { QueryClientProvider,QueryClient } from "react-query"

export default function grupo() {
    const queryclient = new QueryClient()
    return (
      <QueryClientProvider client={queryclient}>
        <TableAdmin />
      </QueryClientProvider>
    )
  }
  