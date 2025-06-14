import { MapPin } from 'lucide-react'
import { Badge } from '../ui/badge'
import {
    Card,
    CardContent, 
    CardFooter,
    CardHeader
} from '../ui/card'
import { Link } from 'react-router'

type PopularSingleTripsCardProps = {
    title: string,
    country: string,
    pois_count: number,
    people_count?: number
}

export default function PopularTripsCard(props: PopularSingleTripsCardProps) {
    const showPeopleCount = props.people_count !== undefined
    return <Link to={"/trip/1"}>
        <Card className='relative py-0 max-w-max'>
            <CardHeader className='px-0 absolute top-5 left-5'>
                <Badge className='py-1 uppercase'>
                    <MapPin/> { props.country || "italy" }
                </Badge>
            </CardHeader>
            <CardContent className='px-0 max-h-100'>
                <img className='max-h-100 object-contain rounded-t-xl' src='/login-images/01.avif' />
            </CardContent>
            <CardFooter className='px-3 pb-5 grid'>
                <p className='w-fit uppercase font-bold pb-3'>{ props.title || "Rosticceria Pallesudate viaggio"}</p>
                <p>{ props.pois_count || 0 } tappe</p>
                { showPeopleCount && 
                    <Badge className='justify-self-end'>
                        { props.people_count } persone
                    </Badge>
                }
            </CardFooter>
        </Card>
    </Link>
}