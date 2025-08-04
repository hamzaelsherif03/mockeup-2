import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Toddler Program (18 months - 3 years) | Little Sprouts Nursery",
  description: "Encouraging independence through structured play and learning with 1:6 ratio, potty training support, social skill development, and creative arts for toddlers 18 months to 3 years.",
  keywords: [
    "toddler daycare", "toddler care", "toddler program", "18 months to 3 years", 
    "toddler development", "potty training", "social skills", "creative arts", 
    "independence building", "structured play", "toddler specialists", "licensed toddler care"
  ],
  openGraph: {
    title: "Toddler Program | Little Sprouts Nursery",
    description: "Encouraging independence through structured play and learning with 1:6 ratio, potty training support, and social skill development.",
    type: "website",
    images: [
      {
        url: "/images/program-toddler.svg",
        width: 800,
        height: 600,
        alt: "Little Sprouts Nursery Toddler Program",
      },
    ],
  },
}

export default function ToddlerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}