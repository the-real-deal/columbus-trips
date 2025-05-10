import { Badge } from '../ui/badge'
import {
    Card,
    CardContent, 
    CardFooter
} from '../ui/card'

type PopularDestinationCardProps = {
    country_flag?: string,
    country: string,
    trips_count: number
}

export default function PopularDestinationCard(props: PopularDestinationCardProps) {
    return <Card className='relative py-0 max-w-max'>
        <CardContent className='px-0 max-h-100'>
            <img className='max-h-100 object-contain' src='/login-images/01.avif'/>
        </CardContent>
        <CardFooter className='px-0 absolute bottom-5 left-5'>
            <Badge className='py-3 px-5 flex flex-col content-start'>
                <p className='uppercase'>{ props.country_flag } { props.country }</p>
                <p>{ props.trips_count } trips</p>
            </Badge>
        </CardFooter>
    </Card>
}