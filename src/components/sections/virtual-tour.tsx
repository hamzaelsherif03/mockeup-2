'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  Volume2, 
  Info, 
  Navigation,
  Camera,
  MapPin,
  Eye
} from 'lucide-react'
import { motion } from 'framer-motion'

const tourRooms = [
  {
    id: 'infant-room',
    name: 'Infant Room',
    description: 'Calm, nurturing space designed for our youngest learners',
    features: [
      'Soft lighting and sound control',
      'Individual cribs and play areas',
      'Feeding and diaper changing stations',
      'Sensory play materials'
    ],
    hotspots: [
      { x: 30, y: 40, title: 'Sleep Area', description: 'Individual cribs with monitoring' },
      { x: 70, y: 30, title: 'Play Zone', description: 'Safe, age-appropriate toys' },
      { x: 50, y: 70, title: 'Feeding Station', description: 'Comfortable nursing area' }
    ]
  },
  {
    id: 'toddler-room',
    name: 'Toddler Room',
    description: 'Active learning environment for curious toddlers',
    features: [
      'Low tables and child-sized furniture',
      'Art and sensory exploration centers',
      'Reading nook with soft seating',
      'Indoor climbing structure'
    ],
    hotspots: [
      { x: 25, y: 35, title: 'Art Center', description: 'Creative expression station' },
      { x: 65, y: 45, title: 'Reading Corner', description: 'Cozy book area' },
      { x: 45, y: 65, title: 'Activity Tables', description: 'Learning and meal space' }
    ]
  },
  {
    id: 'preschool-room',
    name: 'Preschool Room',
    description: 'Structured learning environment with activity centers',
    features: [
      'Learning centers for different subjects',
      'Circle time area with smart board',
      'Dramatic play and building zones',
      'Individual cubbies and storage'
    ],
    hotspots: [
      { x: 40, y: 25, title: 'Circle Time', description: 'Group learning area' },
      { x: 75, y: 40, title: 'Learning Centers', description: 'Math, science, and literacy' },
      { x: 20, y: 60, title: 'Dramatic Play', description: 'Imaginative play area' }
    ]
  },
  {
    id: 'playground',
    name: 'Outdoor Playground',
    description: 'Safe, fenced outdoor play area with age-appropriate equipment',
    features: [
      'Separate areas for different age groups',
      'Climbing structures and slides',
      'Sandbox and water play area',
      'Garden and nature exploration'
    ],
    hotspots: [
      { x: 35, y: 30, title: 'Climbing Structure', description: 'Safe outdoor equipment' },
      { x: 60, y: 50, title: 'Sandbox', description: 'Sensory play area' },
      { x: 80, y: 70, title: 'Garden', description: 'Learning about nature' }
    ]
  }
]

export function VirtualTour() {
  const [currentRoom, setCurrentRoom] = useState(0)
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const room = tourRooms[currentRoom]

  return (
    <section className="nursery-section bg-background">
      <div className="nursery-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Take a Virtual Tour
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our facility from the comfort of your home. Click on the hotspots 
            to learn more about each area of our nurturing environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tour View */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Virtual Tour Container */}
                  <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                    {/* Placeholder for 360° view */}
                    <div className="absolute inset-4 bg-gradient-to-br from-sage-green-100 to-forest-green-100 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <Eye className="h-16 w-16 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                        <p className="text-muted-foreground text-sm max-w-md">
                          {room.description}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Hotspots */}
                    {room.hotspots.map((hotspot, index) => (
                      <button
                        key={index}
                        className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-300 hover:scale-110 ${
                          selectedHotspot === index
                            ? 'bg-accent animate-pulse'
                            : 'bg-primary hover:bg-primary/80'
                        }`}
                        style={{
                          left: `${hotspot.x}%`,
                          top: `${hotspot.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onClick={() => setSelectedHotspot(selectedHotspot === index ? null : index)}
                        aria-label={`View ${hotspot.title}`}
                      >
                        <Info className="h-4 w-4 text-white mx-auto" />
                      </button>
                    ))}

                    {/* Hotspot Info Popup */}
                    {selectedHotspot !== null && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute bg-background border border-border rounded-xl p-4 shadow-lg max-w-xs z-10"
                        style={{
                          left: `${room.hotspots[selectedHotspot].x}%`,
                          top: `${Math.max(room.hotspots[selectedHotspot].y - 15, 5)}%`,
                          transform: 'translateX(-50%)'
                        }}
                      >
                        <h4 className="font-semibold mb-1">
                          {room.hotspots[selectedHotspot].title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {room.hotspots[selectedHotspot].description}
                        </p>
                      </motion.div>
                    )}

                    {/* Tour Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="secondary" size="sm">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm">
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="bg-background/80 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                        {currentRoom + 1} / {tourRooms.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Room Navigation & Info */}
          <div className="space-y-6">
            {/* Room Selector */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Navigation className="h-5 w-5 mr-2" />
                  Tour Rooms
                </h3>
                <div className="space-y-2">
                  {tourRooms.map((tourRoom, index) => (
                    <button
                      key={tourRoom.id}
                      onClick={() => {
                        setCurrentRoom(index)
                        setSelectedHotspot(null)
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentRoom === index
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">{tourRoom.name}</div>
                          <div className={`text-xs ${
                            currentRoom === index ? 'text-primary-foreground/80' : 'text-muted-foreground'
                          }`}>
                            {tourRoom.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Room Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Room Features
                </h3>
                <ul className="space-y-2">
                  {room.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-primary/5">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Ready for an In-Person Visit?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule a personal tour to experience our facility firsthand and meet our amazing team.
                </p>
                <Button variant="nursery" className="w-full">
                  Schedule Your Tour
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}