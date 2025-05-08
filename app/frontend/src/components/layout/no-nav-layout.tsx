import Footer from "../footer"

type NoNavLayoutProps = {
    children: React.ReactNode | string
}

export default function NoNavLayout({ children }: NoNavLayoutProps) {
    return <section>
        <main>
            { children }
        </main>
        <Footer/>
    </section>
}