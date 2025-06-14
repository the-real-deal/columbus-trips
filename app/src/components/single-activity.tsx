import { Badge } from "./ui/badge";

interface SingleActivityProps extends React.PropsWithChildren {
    onClick: () => void
}

export default function SingleActivity({ children, onClick }: SingleActivityProps) {
    return <Badge>
        { children }
    </Badge>
}