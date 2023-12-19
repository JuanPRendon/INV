"use client"
import EditConteo from "@/components/editConteo";
import { QueryClient,QueryClientProvider } from "react-query"



export default function editConteo(props) {
    const queryclient = new QueryClient()

    return (
        <QueryClientProvider client={queryclient}>
            <EditConteo datos={props}/>
        </QueryClientProvider>
    )
  }