import { cn } from "@/lib/utils"
import Footer from "../footer"
import Navbar from "../navbar"

interface DefaultLayoutProps {
    children: React.ReactNode | string,
    className? : string
}

export default function DefaultLayout({ children, className }: DefaultLayoutProps) {
    return <section className="h-full flex flex-col">
        <Navbar className="flex justify-center w-full"/>
        <main className={cn(`grow p-10`, className)}>
            { children }
        </main>
        <Footer/>
    </section>
}