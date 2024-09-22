import React, { useState } from "react"
import { HydraCarousel as HydraCarouselType } from "@/model/hydra"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { HydraCard } from "@/components/hydra/card"

export const HydraCarousel: React.FC<HydraCarouselType> = ({
  cards,
  className,
}) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null)

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(prevIndex => prevIndex === index ? null : index)
  }

  if (cards.length <= 2) {
    return (
      <div className="mx-auto w-full max-w-6xl mt-4">
        <div className="flex flex-row space-x-4">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="flex-1 cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <HydraCard 
                {...card} 
                className={`h-full ${selectedCardIndex === index ? 'outline outline-2 outline-green-500' : ''}`} 
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl mt-4">
      <Carousel className={`${className} bg-background`}>
        <CarouselContent>
          {cards.map((card, index) => (
            <CarouselItem 
              key={index} 
              className="sm:basis-2/3 md:basis-1/2 cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div className="p-1 h-full">
                <HydraCard 
                  {...card} 
                  className={`h-full ${selectedCardIndex === index ? 'outline outline-2 outline-green-500' : ''}`} 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
