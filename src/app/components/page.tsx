import React from "react"
import {
  HydraBadge as HydraBadgeType,
  HydraButton as HydraButtonType,
  HydraCard as HydraCardType,
  HydraCarousel as HydraCarouselType,
} from "@/model/hydra"

import { HydraButton } from "@/components/hydra/button"
import { HydraCard } from "@/components/hydra/card"
import { HydraCarousel } from "@/components/hydra/carousel"

// Sample data for demonstration
const sampleCards: HydraCardType[] = [
  {
    title: "Sample Card 1",
    description: "This is a sample card description",
    header: "Card Header",
    badges: [
      {
        text: "Label 1",
        variant: "default",
        className: "bg-blue-500 text-white",
      },
    ],
    content: "This is the main content of the card.",
    buttons: [
      { text: "Learn More", href: "/#", variant: "default" },
      { text: "Contact", href: "/#", variant: "outline" },
      {
        text: "Visit Website",
        variant: "link",
        size: "default",
        href: "#",
        className: "btn-link",
      },
    ],
    footer: "Card Footer",
  },
  {
    title: "Sample Card 2",
    description: "Another sample card",
    badges: [
      {
        text: "Label 2",
        variant: "secondary",
        className: "bg-green-500 text-white",
      },
    ],
    content: "Content for the second card.",
    buttons: [{ text: "Details", href: "/#", variant: "secondary" }],
  },
  {
    title: "Sample Card 3",
    badges: [
      {
        text: "Label 3",
        variant: "secondary",
        className: "bg-gray-500 text-white",
      },
    ],
    content: "A simple card with just content.",
    buttons: [{ text: "Click me", href: "/#", variant: "default" }],
  },
]

const sampleCarousel: HydraCarouselType = {
  cards: sampleCards,
  className: "my-8",
}

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Hydra Components Demo</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Individual Card</h2>
        <HydraCard {...sampleCards[0]} className="max-w-md" />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Individual Button</h2>
        <HydraButton text="Sample Button" href="/#" variant="default" />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Carousel</h2>
        <HydraCarousel {...sampleCarousel} />
      </section>
    </div>
  )
}

export default HomePage
