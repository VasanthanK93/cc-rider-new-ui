import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { EventCard } from '@/components/ui/custom/eventcard';

export function EventCarousel () {
  // ToDo Sriram: Get event details in const and create EventCards appropriately
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="basis-1/3">
          <EventCard eventTitle={"Tenacity 110"} eventDescription={"Test your limits"}/>
        </CarouselItem>
        <CarouselItem className="basis-1/3">
          <EventCard eventTitle={"Summer commute challenge"} eventDescription={"Be the change"}/>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}