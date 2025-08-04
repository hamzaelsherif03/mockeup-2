import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Preschool Program (3 - 4 years) | Little Sprouts Nursery",
  description: "Building foundation skills through play-based learning with 1:8 ratio, pre-literacy & math skills, circle time, group activities, and field trips for children 3 to 4 years old.",
  keywords: [
    "preschool program", "preschool daycare", "3 to 4 years", "pre-literacy", 
    "early math skills", "kindergarten prep", "circle time", "group activities", 
    "field trips", "play-based learning", "foundation skills", "preschool education"
  ],
  openGraph: {
    title: "Preschool Program | Little Sprouts Nursery",
    description: "Building foundation skills through play-based learning with pre-literacy, math skills, circle time, and exciting field trips.",
    type: "website",
    images: [
      {
        url: "/images/program-preschool.svg",
        width: 800,
        height: 600,
        alt: "Little Sprouts Nursery Preschool Program",
      },
    ],
  },
}

export default function PreschoolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}