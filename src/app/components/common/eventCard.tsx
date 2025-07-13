import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/common/card';
import { Button } from '@/app/components/common/button';
import Link from 'next/link';

export interface EventCardProps {
  eventTitle: string;
  eventImageUrl?: string;
  eventDescription?: string;
  eventId: string;
  eventType: string; // Optional, can be used for additional logic
}

export function EventCard(props: EventCardProps) {
  const eventImageUrl =
    props.eventImageUrl ||
    'https://media.istockphoto.com/id/108271803/photo/cycling-event.jpg?s=612x612&w=0&k=20&c=fV0kww8jNMXh3F2wwwDg14_Sp-jvdidfMM7EU_F-lUU=';
  
  const eventDescription =
    props.eventDescription || 'check out the event details on our website.';
    return (
    <Card className={'p-auto border-0 h-full gap-0 w-75'}>
      <CardHeader className={'px-auto h-3/7 max-w-full'}>
        <img src={eventImageUrl} className={'w-60 h-40'} />
      </CardHeader>
      <CardContent className={'h-3/7 max-w-full pt-5'}>
        <CardTitle>{props.eventTitle}</CardTitle>
          <CardDescription className={'mt-5'}>
            {eventDescription}
          </CardDescription>
      </CardContent>
      <CardFooter className={'mb-5'}>
        {props.eventType === 'upcoming' ? (
          <Button className={'w-full rounded-full'}><Link href={`/registration/${props.eventId}`}>
                Register now</Link></Button>) : (
          <Button className={'w-full rounded-full'}><Link href={`/activities/${props.eventId}`}>
                View details</Link></Button> )}
        
      </CardFooter>
    </Card>
  );
}
