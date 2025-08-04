'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { OptimizedImage } from '@/components/ui/optimized-image'

// Types for parent portal data
interface Child {
  id: string
  name: string
  age: number
  program: string
  teacher: string
  classroom: string
  photo?: string
}

interface DailyReport {
  id: string
  date: string
  childId: string
  meals: {
    breakfast: { time: string; items: string[]; amount: 'all' | 'most' | 'some' | 'none' }
    lunch: { time: string; items: string[]; amount: 'all' | 'most' | 'some' | 'none' }
    snack: { time: string; items: string[]; amount: 'all' | 'most' | 'some' | 'none' }
  }
  nap: {
    time: string
    duration: string
    quality: 'excellent' | 'good' | 'fair' | 'restless'
  }
  activities: string[]
  mood: 'happy' | 'content' | 'fussy' | 'sleepy'
  diapers?: number
  potty?: number
  notes: string
  photos: string[]
}

interface Announcement {
  id: string
  title: string
  content: string
  type: 'general' | 'classroom' | 'urgent' | 'event'
  date: string
  author: string
  priority: 'low' | 'medium' | 'high'
  targetGroups: string[]
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: 'field_trip' | 'parent_meeting' | 'holiday' | 'special_event'
  rsvpRequired: boolean
  rsvpDeadline?: string
}

// Main Parent Portal Dashboard
export function ParentPortalDashboard({ parentId }: { parentId: string }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'daily-reports' | 'announcements' | 'events' | 'messages'>('overview')
  const [children, setChildren] = useState<Child[]>([])
  const [dailyReports, setDailyReports] = useState<DailyReport[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    // Fetch parent portal data
    fetchPortalData()
  }, [parentId])

  const fetchPortalData = async () => {
    try {
      const [childrenRes, reportsRes, announcementsRes, eventsRes] = await Promise.all([
        fetch(`/api/parent-portal/children?parentId=${parentId}`),
        fetch(`/api/parent-portal/daily-reports?parentId=${parentId}`),
        fetch(`/api/parent-portal/announcements?parentId=${parentId}`),
        fetch(`/api/parent-portal/events?parentId=${parentId}`)
      ])

      setChildren(await childrenRes.json())
      setDailyReports(await reportsRes.json())
      setAnnouncements(await announcementsRes.json())
      setEvents(await eventsRes.json())
    } catch (error) {
      console.error('Error fetching portal data:', error)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'daily-reports', label: 'Daily Reports', icon: '📋' },
    { id: 'announcements', label: 'Announcements', icon: '📢' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'messages', label: 'Messages', icon: '💬' }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Parent Portal</h1>
        <p className="text-gray-600">Stay connected with your child's day at Little Sprouts</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <OverviewTab children={children} dailyReports={dailyReports} announcements={announcements} />
          )}
          {activeTab === 'daily-reports' && (
            <DailyReportsTab children={children} reports={dailyReports} />
          )}
          {activeTab === 'announcements' && (
            <AnnouncementsTab announcements={announcements} />
          )}
          {activeTab === 'events' && (
            <EventsTab events={events} />
          )}
          {activeTab === 'messages' && (
            <MessagesTab />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Overview Tab Component
function OverviewTab({ 
  children, 
  dailyReports, 
  announcements 
}: { 
  children: Child[]
  dailyReports: DailyReport[]
  announcements: Announcement[]
}) {
  const todayReports = dailyReports.filter(report => 
    report.date === new Date().toISOString().split('T')[0]
  )

  const urgentAnnouncements = announcements.filter(ann => 
    ann.priority === 'high' || ann.type === 'urgent'
  ).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Children Enrolled</p>
              <p className="text-2xl font-bold text-gray-900">{children.length}</p>
            </div>
            <div className="text-2xl">👶</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Reports</p>
              <p className="text-2xl font-bold text-gray-900">{todayReports.length}</p>
            </div>
            <div className="text-2xl">📋</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Messages</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="text-2xl">💬</div>
          </div>
        </Card>
      </div>

      {/* Children Overview */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Children</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map(child => (
            <div key={child.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              {child.photo && (
                <OptimizedImage
                  src={child.photo}
                  alt={child.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{child.name}</h3>
                <p className="text-sm text-gray-600">{child.program} • Age {child.age}</p>
                <p className="text-sm text-gray-600">Teacher: {child.teacher}</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">{child.classroom}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Daily Reports */}
      {todayReports.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Updates</h2>
          <div className="space-y-4">
            {todayReports.map(report => {
              const child = children.find(c => c.id === report.childId)
              return (
                <div key={report.id} className="border-l-4 border-l-blue-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{child?.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{report.notes}</p>
                    </div>
                    <Badge variant={report.mood === 'happy' ? 'default' : 'outline'}>
                      {report.mood}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Important Announcements */}
      {urgentAnnouncements.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Important Announcements</h2>
          <div className="space-y-3">
            {urgentAnnouncements.map(announcement => (
              <div key={announcement.id} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-yellow-600 mt-1">
                  {announcement.type === 'urgent' ? '🚨' : '📢'}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                  <p className="text-xs text-gray-500 mt-2">{announcement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

// Daily Reports Tab Component
function DailyReportsTab({ children, reports }: { children: Child[]; reports: DailyReport[] }) {
  const [selectedChild, setSelectedChild] = useState<string>(children[0]?.id)
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])

  const filteredReports = reports.filter(report => 
    report.childId === selectedChild && report.date === selectedDate
  )

  const currentReport = filteredReports[0]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex space-x-4">
        <select
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {children.map(child => (
            <option key={child.id} value={child.id}>{child.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Daily Report */}
      {currentReport ? (
        <DailyReportCard report={currentReport} child={children.find(c => c.id === selectedChild)!} />
      ) : (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No report available for this date</p>
        </Card>
      )}
    </div>
  )
}

// Daily Report Card Component
function DailyReportCard({ report, child }: { report: DailyReport; child: Child }) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{child.name}'s Daily Report</h2>
          <p className="text-gray-600">{report.date}</p>
        </div>
        <Badge variant={report.mood === 'happy' ? 'default' : 'outline'}>
          {report.mood}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meals */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Meals & Nutrition</h3>
          <div className="space-y-3">
            {Object.entries(report.meals).map(([meal, data]) => (
              <div key={meal} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium capitalize">{meal}</span>
                  <Badge variant="outline">{data.amount}</Badge>
                </div>
                <p className="text-sm text-gray-600">{data.time}</p>
                <p className="text-sm text-gray-600">{data.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sleep & Activities */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Sleep & Activities</h3>
          
          <div className="p-3 bg-gray-50 rounded-lg mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">Nap Time</span>
              <Badge variant="outline">{report.nap.quality}</Badge>
            </div>
            <p className="text-sm text-gray-600">{report.nap.time} • {report.nap.duration}</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="font-medium block mb-2">Activities</span>
            <ul className="text-sm text-gray-600 space-y-1">
              {report.activities.map((activity, index) => (
                <li key={index}>• {activity}</li>
              ))}
            </ul>
          </div>

          {(report.diapers !== undefined || report.potty !== undefined) && (
            <div className="p-3 bg-gray-50 rounded-lg mt-3">
              <span className="font-medium block mb-2">Bathroom</span>
              {report.diapers !== undefined && (
                <p className="text-sm text-gray-600">Diapers changed: {report.diapers}</p>
              )}
              {report.potty !== undefined && (
                <p className="text-sm text-gray-600">Potty breaks: {report.potty}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {report.notes && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Teacher's Notes</h3>
          <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">{report.notes}</p>
        </div>
      )}

      {/* Photos */}
      {report.photos.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Today's Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {report.photos.map((photo, index) => (
              <OptimizedImage
                key={index}
                src={photo}
                alt={`${child.name} activity photo`}
                aspectRatio="square"
                className="rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

// Announcements Tab Component
function AnnouncementsTab({ announcements }: { announcements: Announcement[] }) {
  const [filter, setFilter] = useState<'all' | 'general' | 'classroom' | 'urgent' | 'event'>('all')

  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(ann => ann.type === filter)

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex space-x-2">
        {['all', 'general', 'classroom', 'urgent', 'event'].map(type => (
          <Button
            key={type}
            variant={filter === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(type as any)}
            className="capitalize"
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map(announcement => (
          <Card key={announcement.id} className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                <Badge 
                  variant={announcement.priority === 'high' ? 'destructive' : 'outline'}
                  className="text-xs"
                >
                  {announcement.type}
                </Badge>
              </div>
              <span className="text-sm text-gray-500">{announcement.date}</span>
            </div>
            <p className="text-gray-700 mb-3">{announcement.content}</p>
            <p className="text-sm text-gray-500">By {announcement.author}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Events Tab Component
function EventsTab({ events }: { events: Event[] }) {
  const [rsvpStatus, setRsvpStatus] = useState<Record<string, 'yes' | 'no' | 'maybe' | null>>({})

  const handleRsvp = async (eventId: string, status: 'yes' | 'no' | 'maybe') => {
    setRsvpStatus(prev => ({ ...prev, [eventId]: status }))
    
    try {
      await fetch('/api/parent-portal/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, status })
      })
    } catch (error) {
      console.error('RSVP error:', error)
    }
  }

  return (
    <div className="space-y-4">
      {events.map(event => (
        <Card key={event.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span>📅 {event.date}</span>
                <span>🕐 {event.time}</span>
                <span>📍 {event.location}</span>
              </div>
            </div>
            <Badge variant="outline" className="capitalize">
              {event.type.replace('_', ' ')}
            </Badge>
          </div>
          
          <p className="text-gray-700 mb-4">{event.description}</p>
          
          {event.rsvpRequired && (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">RSVP:</span>
              {(['yes', 'no', 'maybe'] as const).map(status => (
                <Button
                  key={status}
                  size="sm"
                  variant={rsvpStatus[event.id] === status ? 'default' : 'outline'}
                  onClick={() => handleRsvp(event.id, status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
              {event.rsvpDeadline && (
                <span className="text-xs text-gray-500 ml-4">
                  Deadline: {event.rsvpDeadline}
                </span>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

// Messages Tab Component
function MessagesTab() {
  return (
    <Card className="p-8 text-center">
      <p className="text-gray-500">Messaging feature coming soon!</p>
      <p className="text-sm text-gray-400 mt-2">
        Direct messaging with teachers and staff will be available in the next update.
      </p>
    </Card>
  )
}