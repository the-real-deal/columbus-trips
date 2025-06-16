import { Badge } from '../ui/badge'
import {
    Card,
    CardContent,
    CardFooter
} from '../ui/card'
import { Link } from 'react-router'

type PopularSingleTripsCardProps = {
    title: string,
    people_count?: number
    id: string
}

export default function PopularTripsCard(props: PopularSingleTripsCardProps) {
    const showPeopleCount = props.people_count !== undefined
    return <Link to={"/trip/" + props.id}>
        <Card className='relative py-0 max-w-max'>
            <CardContent className='px-0 max-h-100'>
                <img className='max-h-100 object-contain rounded-t-xl' src='/login-images/01.avif' />
            </CardContent>
            <CardFooter className='px-3 pb-5 grid'>
                <p className='w-fit uppercase font-bold pb-3'>{props.title || "Rosticceria Pallesudate viaggio"}</p>
                { showPeopleCount &&
                    <Badge className='justify-self-end'>
                        {props.people_count} persone
                    </Badge>
                }
            </CardFooter>
        </Card>
    </Link>
}