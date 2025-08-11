import { type LucideIcon, Dumbbell, VibrateIcon as Volleyball, Goal, Circle } from "lucide-react"

export type Facility = {
  id: string
  name: string
  sport: string
  sportLabel: string
  rating: number
  pricePerHour: number
  location: { city: string }
}

export const sports: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "badminton", label: "Badminton", icon: Circle },
  { id: "tennis", label: "Tennis", icon: Circle },
  { id: "squash", label: "Squash", icon: Dumbbell },
  { id: "volleyball", label: "Volleyball", icon: Volleyball },
  { id: "football", label: "Football", icon: Goal },
]

export const facilities: Facility[] = [
  {
    id: "srr-badminton",
    name: "SRR Badminton Arena",
    sport: "badminton",
    sportLabel: "Badminton",
    rating: 4.6,
    pricePerHour: 35,
    location: { city: "Palo Alto" },
  },
  {
    id: "westside-tennis",
    name: "Westside Tennis Center",
    sport: "tennis",
    sportLabel: "Tennis",
    rating: 4.8,
    pricePerHour: 40,
    location: { city: "San Jose" },
  },
  {
    id: "city-squash",
    name: "City Squash Courts",
    sport: "squash",
    sportLabel: "Squash",
    rating: 4.4,
    pricePerHour: 30,
    location: { city: "Sunnyvale" },
  },
  {
    id: "beach-volley",
    name: "Shoreline Volleyball Park",
    sport: "volleyball",
    sportLabel: "Volleyball",
    rating: 4.3,
    pricePerHour: 25,
    location: { city: "Mountain View" },
  },
  {
    id: "community-football",
    name: "Community Football Turf",
    sport: "football",
    sportLabel: "Football",
    rating: 4.2,
    pricePerHour: 50,
    location: { city: "Santa Clara" },
  },
  {
    id: "north-tennis",
    name: "North End Tennis Club",
    sport: "tennis",
    sportLabel: "Tennis",
    rating: 4.5,
    pricePerHour: 42,
    location: { city: "Sunnyvale" },
  },
]
