'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WifiOff, RefreshCw, Phone, Mail } from 'lucide-react'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <WifiOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-serif">You're Offline</CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground">
            It looks like you've lost your internet connection. Don't worry - 
            you can still browse some of our content that's been saved on your device.
          </p>

          <div className="space-y-3">
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="w-full"
            >
              Go Back
            </Button>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="font-semibold">Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              You can still reach us directly:
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.location.href = 'tel:+15551234567'}
              >
                <Phone className="h-4 w-4" />
                Call Us
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.location.href = 'mailto:info@littlesprouts.com'}
              >
                <Mail className="h-4 w-4" />
                Email Us
              </Button>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">Available Offline:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Contact information</li>
              <li>• Basic program details</li>
              <li>• Facility images</li>
              <li>• Staff information</li>
            </ul>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Little Sprouts Nursery</p>
            <p>123 Nursery Lane, Springfield, ST 12345</p>
            <p>(555) 123-4567</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}