import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Pre-K Program (4 - 5 years) | Little Sprouts Nursery",
  description: "Comprehensive kindergarten readiness program with 1:10 ratio, advanced learning, reading & writing skills, science experiments, and social preparation for children 4 to 5 years old.",
  keywords: [
    "pre-k program", "kindergarten readiness", "4 to 5 years", "advanced learning", 
    "reading skills", "writing skills", "science experiments", "social preparation", 
    "kindergarten prep", "early elementary", "school readiness", "pre-kindergarten"
  ],
  openGraph: {
    title: "Pre-K Program | Little Sprouts Nursery",
    description: "Comprehensive kindergarten readiness program with advanced learning, reading & writing skills, and science experiments.",
    type: "website",
    images: [
      {
        url: "/images/program-prek.svg",
        width: 800,
        height: 600,
        alt: "Little Sprouts Nursery Pre-K Program",
      },
    ],
  },
}

export default function PreKLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}