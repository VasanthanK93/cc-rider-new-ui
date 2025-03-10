import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface EventCardProps {
  eventTitle: string;
  eventImageUrl?: string;
  eventDescription?: string;
}

export function EventCard(props: EventCardProps) {
  const eventImageUrl = props.eventImageUrl || "https://media.istockphoto.com/id/108271803/photo/cycling-event.jpg?s=612x612&w=0&k=20&c=fV0kww8jNMXh3F2wwwDg14_Sp-jvdidfMM7EU_F-lUU=";
  return (
    <Card>
      <CardContent>
        <img src={eventImageUrl}/>
      </CardContent>
      <CardHeader>
        <CardTitle>{props.eventTitle}</CardTitle>
        <CardDescription>{props.eventDescription}</CardDescription>
      </CardHeader>
      <CardFooter className={"max-w-fit w-full"}>
        <Button>Register now</Button>
      </CardFooter>
    </Card>
  )
}