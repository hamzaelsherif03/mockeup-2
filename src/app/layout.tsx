import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { CSSChecker } from "@/components/debug/css-checker";
import { PopupProvider } from "@/components/popup/PopupProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://littlesproutsnursery.com'),
  title: {
    default: "Little Sprouts Nursery - Quality Childcare & Early Learning",
    template: "%s | Little Sprouts Nursery"
  },
  description: "Licensed childcare center providing quality early education with experienced teachers, proven curriculum, and a nurturing environment for children aged 6 weeks to 5 years.",
  keywords: [
    "nursery", "childcare", "daycare", "early learning", "preschool", 
    "toddler care", "infant care", "licensed daycare", "quality childcare",
    "early childhood education", "nursery school", "child development"
  ],
  authors: [{ name: "Little Sprouts Nursery", url: "https://littlesproutsnursery.com" }],
  creator: "Little Sprouts Nursery",
  publisher: "Little Sprouts Nursery",
  category: "Education",
  classification: "Childcare Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Little Sprouts",
    startupImage: [
      {
        url: "/icons/apple-startup-320x568.png",
        media: "(device-width: 320px) and (device-height: 568px)"
      }
    ]
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://littlesproutsnursery.com",
    languages: {
      'en-US': 'https://littlesproutsnursery.com',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://littlesproutsnursery.com",
    siteName: "Little Sprouts Nursery",
    title: "Little Sprouts Nursery - Quality Childcare & Early Learning",
    description: "Licensed childcare center providing quality early education with experienced teachers, proven curriculum, and a nurturing environment.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Little Sprouts Nursery - Quality Childcare",
        type: "image/jpeg"
      },
      {
        url: "/images/og-square.jpg",
        width: 600,
        height: 600,
        alt: "Little Sprouts Nursery Logo",
        type: "image/jpeg"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@littlesproutsnursery",
    creator: "@littlesproutsnursery",
    title: "Little Sprouts Nursery - Quality Childcare & Early Learning",
    description: "Licensed childcare center providing quality early education with experienced teachers, proven curriculum, and a nurturing environment.",
    images: {
      url: "/images/og-image.jpg",
      alt: "Little Sprouts Nursery - Quality Childcare"
    }
  },
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    "facebook-domain-verification": process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION || ""
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#A0826D" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Little Sprouts" />
        <meta name="msapplication-TileColor" content="#A0826D" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Performance Resource Hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical resources - Add back when images are available */}
        {/* <link rel="preload" href="/images/nursery-logo.webp" as="image" type="image/webp" /> */}
        {/* <link rel="preload" href="/images/hero-background.webp" as="image" type="image/webp" /> */}
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <ErrorBoundary>
          <PopupProvider>
            {children}
          </PopupProvider>
        </ErrorBoundary>
        
        {/* CSS Debug Component - Re-enabled */}
        <CSSChecker />
        
        {/* WebVitals still temporarily disabled */}
        {/* <WebVitals debug={process.env.NODE_ENV === 'development'} /> */}
        
        {/* Performance Monitoring Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // CSS Loading Debug
              console.log('🎨 CSS Debug: Starting CSS load check...');
              
              // Check for stylesheets
              window.addEventListener('DOMContentLoaded', function() {
                const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
                console.log('🎨 CSS Debug: Found ' + stylesheets.length + ' stylesheets');
                
                stylesheets.forEach((sheet, index) => {
                  console.log('🎨 CSS Debug: Stylesheet ' + (index + 1) + ':', sheet.href);
                  
                  // Check if stylesheet loaded
                  sheet.addEventListener('load', function() {
                    console.log('✅ CSS Debug: Loaded stylesheet:', sheet.href);
                  });
                  
                  sheet.addEventListener('error', function() {
                    console.error('❌ CSS Debug: Failed to load stylesheet:', sheet.href);
                  });
                });
                
                // Check computed styles
                const testElement = document.body;
                const computedStyle = window.getComputedStyle(testElement);
                console.log('🎨 CSS Debug: Body background-color:', computedStyle.backgroundColor);
                console.log('🎨 CSS Debug: Body color:', computedStyle.color);
                console.log('🎨 CSS Debug: Body font-family:', computedStyle.fontFamily);
                
                // Check CSS variables
                const rootStyle = getComputedStyle(document.documentElement);
                console.log('🎨 CSS Debug: --background:', rootStyle.getPropertyValue('--background'));
                console.log('🎨 CSS Debug: --primary:', rootStyle.getPropertyValue('--primary'));
                console.log('🎨 CSS Debug: --foreground:', rootStyle.getPropertyValue('--foreground'));
              });
              
              // Service Worker Registration
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
              
              // Performance Monitoring
              window.addEventListener('load', function() {
                const monitor = window.__PERFORMANCE_MONITOR__;
                if (monitor && monitor.startMonitoring) {
                  monitor.startMonitoring();
                }
              });
              
              // Critical CSS for above-the-fold content
              const criticalCSS = \`
                .hero-section { min-height: 60vh; }
                .loading-spinner { animation: spin 1s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }
              \`;
              
              const style = document.createElement('style');
              style.textContent = criticalCSS;
              document.head.appendChild(style);
            `,
          }}
        />
        
        {/* Google Analytics (if enabled) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                    anonymize_ip: true,
                    allow_google_signals: false,
                    allow_ad_personalization_signals: false
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
