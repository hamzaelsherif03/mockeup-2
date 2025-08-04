import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Infant Program (6 weeks - 18 months) | Little Sprouts Nursery",
  description: "Professional infant care with 1:4 ratio, individualized attention, flexible feeding schedules, and daily reports. Nurturing environment for babies 6 weeks to 18 months.",
  keywords: [
    "infant daycare", "baby care", "infant program", "6 weeks to 18 months", 
    "infant development", "baby nursery", "individualized infant care", 
    "flexible feeding schedules", "infant specialists", "licensed infant care"
  ],
  openGraph: {
    title: "Infant Program | Little Sprouts Nursery",
    description: "Professional infant care with 1:4 ratio, individualized attention, and flexible schedules in a nurturing environment.",
    type: "website",
    images: [
      {
        url: "/images/program-infant.svg",
        width: 800,
        height: 600,
        alt: "Little Sprouts Nursery Infant Program",
      },
    ],
  },
}

export default function InfantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}