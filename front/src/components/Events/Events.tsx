import { EventProps } from '../../types/interfaces';

export default function Events ({ event }: EventProps) { 
    return (
    <div className='randomEvent'>
        {event}
    </div>
    )
}