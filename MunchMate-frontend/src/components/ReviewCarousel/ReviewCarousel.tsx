import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ReviewCarousel = () => {
  const reviews = [
    { id: 1, content: "Great food and service!", author: "John Doe" },
    { id: 2, content: "Amazing ambiance!", author: "Jane Smith" },
    { id: 3, content: "Loved the dessert!", author: "Emily Johnson" },
    { id: 4, content: "Best restaurant in town!", author: "Michael Brown" },
    { id: 5, content: "Will visit again!", author: "Sarah Lee" },
  ];

  return (
    <div className="flex justify-center">
      <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="w-full">
              <div className="p-1">
                <Card className="rounded-lg">
                  <CardContent className="flex items-center justify-center p-6 rounded-lg">
                    <div className="text-center">
                      <p className="text-xl font-semibold">{review.content}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        - {review.author}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ReviewCarousel;
