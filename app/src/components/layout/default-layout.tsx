import { cn } from "@/lib/utils"
import Footer from "../footer"
import Navbar from "../navbar"
import { useAuth } from "@/auth/AuthContext"
import { useNavigate } from "react-router"
import { useEffect } from "react"

interface DefaultLayoutProps {
    children: React.ReactNode | string,
    className? : string
}

export default function DefaultLayout({ children, className }: DefaultLayoutProps) {
    const { user, login, logout } = useAuth()
    const navigator = useNavigate()
    
    useEffect(() => {
        if (!user) {
            navigator("/auth")
        }
    }, [])

    return <section className="h-full flex flex-col">
        <Navbar className="flex justify-center w-full"/>
        <main className={cn(`grow p-10`, className)}>
            { children }
        </main>
        <Footer/>
    </section>
}