"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { MapPin, Star, Clock, Users, Search, Filter } from "lucide-react"

// Sample pub data
const pubs = [
  {
    id: 1,
    name: "The Cavern Pub",
    distance: "0.3 miles",
    rating: 4.8,
    reviews: 324,
    openUntil: "11:30 PM",
    capacity: "Large",
    features: ["Live Music", "Food", "Sky Sports"],
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: 2,
    name: "The Kop End",
    distance: "0.5 miles",
    rating: 4.9,
    reviews: 567,
    openUntil: "12:00 AM",
    capacity: "Medium",
    features: ["Match Day Special", "Food", "Beer Garden"],
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: 3,
    name: "Anfield Tavern",
    distance: "0.7 miles",
    rating: 4.7,
    reviews: 289,
    openUntil: "11:00 PM",
    capacity: "Large",
    features: ["Traditional Pub", "Food", "Pool Table"],
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: 4,
    name: "The Red Lion",
    distance: "0.9 miles",
    rating: 4.6,
    reviews: 412,
    openUntil: "10:30 PM",
    capacity: "Small",
    features: ["Cozy Atmosphere", "Food", "Quiz Night"],
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: 5,
    name: "The Shankly",
    distance: "1.2 miles",
    rating: 4.9,
    reviews: 678,
    openUntil: "12:30 AM",
    capacity: "Large",
    features: ["LFC Memorabilia", "Food", "Sky Sports"],
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: 6,
    name: "The Albert",
    distance: "1.4 miles",
    rating: 4.5,
    reviews: 234,
    openUntil: "11:00 PM",
    capacity: "Medium",
    features: ["Historic Pub", "Food", "Live Sports"],
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
]

export default function LiverpoolPubFinder() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPubs, setFilteredPubs] = useState(pubs)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = pubs.filter(
      (pub) =>
        pub.name.toLowerCase().includes(term.toLowerCase()) ||
        pub.features.some((feature) => feature.toLowerCase().includes(term.toLowerCase())),
    )
    setFilteredPubs(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <header className="bg-liverpool-red text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-liverpool-red rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LFC</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Liverpool FC Pub Finder</h1>
                <p className="text-red-100">Find the best pubs near Anfield</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white text-liverpool-red">
              You'll Never Walk Alone
            </Badge>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search pubs by name or features..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-red-200 focus:border-liverpool-red"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-gray-600">Found {filteredPubs.length} pubs near Anfield Stadium</p>
            <Button
              variant="outline"
              className="border-liverpool-red text-liverpool-red hover:bg-liverpool-red hover:text-white bg-transparent"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Pubs Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPubs.map((pub) => (
            <Card
              key={pub.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-red-100 hover:border-liverpool-red"
            >
              <CardHeader className="p-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {pub.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${pub.name} - Image ${index + 1}`}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-liverpool-red text-white">
                              {index + 1}/{pub.images.length}
                            </Badge>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Pub Name and Rating */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-900">{pub.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{pub.rating}</span>
                      <span className="text-gray-500 text-sm">({pub.reviews})</span>
                    </div>
                  </div>

                  {/* Distance and Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-liverpool-red" />
                      <span>{pub.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Open until {pub.openUntil}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{pub.capacity} capacity</span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {pub.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-red-50 text-liverpool-red border border-red-200"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-liverpool-red hover:bg-red-700 text-white">
                    View Details & Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Liverpool FC Pub Finder. You'll Never Walk Alone.</p>
        </div>
      </footer>
    </div>
  )
}
