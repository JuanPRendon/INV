"use client"
import LoginUser from "@/components/login"
import { QueryClient,QueryClientProvider } from "react-query"


export default function login() {
    const queryclient = new QueryClient()
    return (
        <>
        <QueryClientProvider client={queryclient}>
            <LoginUser />
        </QueryClientProvider>
        </>
    )
  }
  