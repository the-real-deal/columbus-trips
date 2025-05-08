import { Badge } from "./ui/badge";
import GitHubIcon from "./ui/gh-icon";
import { Separator } from "./ui/separator";
import ColumbusBrand from "./ui/columbus-brand";

type FooterProps = {
    className?: string
}

export default function Footer({ className }: FooterProps) {
    return <footer className={`${className !== undefined ? className.concat(" ") : ""}w-full lg:h-56 flex flex-col lg:flex-row justify-center`}>
        <div className="py-5 px-10 lg:py-0 w-full lg:px-0 lg:ps-10 lg:w-1/2 h-full flex flex-col justify-center">
            <ColumbusBrand fontSize="2xl"/>
            <Separator className="mt-2 mb-4"/>
            <h6 className="text-lg">Database Course final project — A.Y. 2024/25</h6>
            <small>Computer Science and Engineering Course @ University of Bologna, Cesena Campus</small>
        </div>
        <div className="py-5 px-10 w-full lg:py-0 lg:text-end lg:px-0 lg:pe-10 lg:w-1/2 h-full flex flex-col justify-center ">
            <h5 className="fw-bold text-lg">Developed by:</h5>
            <h6>Gioele Foschi, Nicholas Magi & Matteo Tonelli</h6>
            <small className="pt-3 align-middle">Source code available on {" "}
                <a target="_blank" href="https://github.com/the-real-deal/columbus-trips/tree/main">
                    <Badge>
                        <GitHubIcon/><pre>GitHub</pre>
                    </Badge>
                </a>
            </small>
        </div>
    </footer>
}