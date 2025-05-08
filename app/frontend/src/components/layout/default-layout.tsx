import Footer from "../footer"
import Navbar from "../navbar"

interface DefaultLayoutProps {
    children: React.ReactNode | string
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return <section className="h-full flex flex-col">
        <Navbar className="flex justify-center w-full"/>
        <main className="grow">
            { children }
        </main>
        <Footer/>
    </section>
}