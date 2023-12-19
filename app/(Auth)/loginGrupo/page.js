"use client"
import LoginConteo from "@/components/loginConteo"
import { QueryClient,QueryClientProvider } from "react-query"


export default function login() {
    const queryclient = new QueryClient()
    return (
        <>
        <QueryClientProvider client={queryclient}>
            <LoginConteo />
        </QueryClientProvider>
        </>
    )
  }
  