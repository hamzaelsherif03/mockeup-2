'use client'

import { PageWrapper } from '@/components/layout/page-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Calendar, Users, MessageSquare, Eye } from 'lucide-react'

// This is a simple demo admin page
// In production, you'd want proper authentication and more sophisticated UI
export default function AdminPage() {
  return (
    <PageWrapper>
      <section className="nursery-section bg-gradient-to-br from-background to-muted">
        <div className="nursery-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-6">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Manage contact forms, tour requests, and website content.
            </p>
          </div>
        </div>
      </section>

      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Contact Forms</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tour Requests</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+1 from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Responses</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Response needed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Total inquiries</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contact Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Enrollment Information</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Mike Chen</p>
                      <p className="text-sm text-muted-foreground">Program Details</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Lisa Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Pricing & Fees</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>

                <Button className="w-full mt-4" variant="outline">
                  View All Contact Forms
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Tour Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Emma Wilson</p>
                      <p className="text-sm text-muted-foreground">Child: Oliver (3 years)</p>
                      <p className="text-xs text-muted-foreground">Tomorrow at 10:00 AM</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">David Kim</p>
                      <p className="text-sm text-muted-foreground">Child: Sophia (18 months)</p>
                      <p className="text-xs text-muted-foreground">Friday at 2:00 PM</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Rachel Brown</p>
                      <p className="text-sm text-muted-foreground">Child: Lucas (4 years)</p>
                      <p className="text-xs text-muted-foreground">Next Monday at 9:00 AM</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>

                <Button className="w-full mt-4" variant="outline">
                  View All Tour Requests
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Supabase Integration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Database Connection</span>
                  <span className="text-green-600 font-medium">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Contact Forms Table</span>
                  <span className="text-green-600 font-medium">Ready</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tour Requests Table</span>
                  <span className="text-green-600 font-medium">Ready</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <span className="text-amber-600 font-medium">Setup Required</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>1. Set up your Supabase project and add environment variables</li>
                  <li>2. Run the SQL schema in your Supabase dashboard</li>
                  <li>3. Configure email notifications (optional)</li>
                  <li>4. Set up authentication for staff access</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageWrapper>
  )
}