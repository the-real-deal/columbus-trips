import { Link } from "react-router"

type ColumbusBrandProps = {
    fontSize?: "xs" | "md" | "lg" | "xl" | "2xl"
}

export default function ColumbusBrand({ fontSize = "md" }: ColumbusBrandProps) {
    return <Link to={"/home"} className={`flex items-center gap-2 font-medium text-${fontSize}`}>
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <img
                src="/columbus-trips-logo.png"
                alt="Image"
                className="filter-invert w-100"
            />
        </div>
        Columbus Trips
    </Link>
}