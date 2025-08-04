'use client'

import { useState, useEffect } from 'react'
import { meetsWCAGAA, meetsWCAGAAA, getContrastRatio, hexToRgb } from '@/lib/accessibility'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ColorTest {
  name: string
  foreground: string
  background: string
  usage: string
}

const colorTests: ColorTest[] = [
  {
    name: 'Primary Text on White',
    foreground: '#2C5530', // Dark sage green
    background: '#FFFFFF',
    usage: 'Main body text'
  },
  {
    name: 'Primary Text on Light Background',
    foreground: '#2C5530',
    background: '#F8F6F3', // Cream background
    usage: 'Text on light sections'
  },
  {
    name: 'White Text on Primary',
    foreground: '#FFFFFF',
    background: '#A0826D', // Warm beige
    usage: 'Button text, headers on colored backgrounds'
  },
  {
    name: 'Secondary Text',
    foreground: '#6B7280', // Gray-500
    background: '#FFFFFF',
    usage: 'Secondary information, captions'
  },
  {
    name: 'Link Text',
    foreground: '#4A6741', // Darker sage
    background: '#FFFFFF',
    usage: 'Links in body text'
  },
  {
    name: 'Error Text',
    foreground: '#DC2626', // Red-600
    background: '#FFFFFF',
    usage: 'Error messages, validation text'
  },
  {
    name: 'Success Text',
    foreground: '#16A34A', // Green-600
    background: '#FFFFFF',
    usage: 'Success messages, confirmations'
  },
  {
    name: 'Focus Ring',
    foreground: '#2563EB', // Blue-600
    background: '#FFFFFF',
    usage: 'Keyboard focus indicators'
  }
]

export function ColorContrastTester() {
  const [results, setResults] = useState<Array<{
    test: ColorTest
    ratio: number
    wcagAA: boolean
    wcagAAA: boolean
  }>>([])

  useEffect(() => {
    const testResults = colorTests.map(test => {
      const fg = hexToRgb(test.foreground)
      const bg = hexToRgb(test.background)
      
      if (!fg || !bg) {
        return {
          test,
          ratio: 0,
          wcagAA: false,
          wcagAAA: false
        }
      }

      const ratio = getContrastRatio(fg, bg)
      
      return {
        test,
        ratio: Math.round(ratio * 100) / 100,
        wcagAA: meetsWCAGAA(test.foreground, test.background),
        wcagAAA: meetsWCAGAAA(test.foreground, test.background)
      }
    })

    setResults(testResults)
  }, [])

  const failedTests = results.filter(result => !result.wcagAA)
  const passedTests = results.filter(result => result.wcagAA)

  if (process.env.NODE_ENV !== 'development') {
    return null // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <details className="group">
        <summary className="list-none cursor-pointer">
          <Button
            variant="outline"
            size="sm"
            className="shadow-lg"
            aria-label="Toggle color contrast test results"
          >
            🎨 Contrast Test
            {failedTests.length > 0 && (
              <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                {failedTests.length}
              </span>
            )}
          </Button>
        </summary>

        <Card className="absolute bottom-12 right-0 w-96 max-h-96 overflow-y-auto p-4 shadow-xl">
          <h3 className="font-semibold mb-4">WCAG Color Contrast Results</h3>
          
          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={index}
                className={`border rounded-lg p-3 ${
                  result.wcagAA ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{result.test.name}</h4>
                  <div className="flex space-x-2">
                    <div
                      className="w-6 h-6 rounded border border-gray-300"
                      style={{
                        backgroundColor: result.test.background,
                        color: result.test.foreground
                      }}
                      title="Color preview"
                    >
                      A
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 mb-2">
                  {result.test.usage}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    Ratio: <span className="font-mono">{result.ratio}</span>
                  </div>
                  <div className="flex space-x-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        result.wcagAA
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      AA {result.wcagAA ? '✓' : '✗'}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        result.wcagAAA
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      AAA {result.wcagAAA ? '✓' : '✗'}
                    </span>
                  </div>
                </div>

                {!result.wcagAA && (
                  <div className="mt-2 text-xs text-red-700 bg-red-100 p-2 rounded">
                    ⚠️ This color combination doesn't meet WCAG AA standards (4.5:1 minimum).
                    Consider using a darker foreground or lighter background.
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Passed AA:</span>
                <span className="font-semibold text-green-600">
                  {passedTests.length}/{results.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Passed AAA:</span>
                <span className="font-semibold">
                  {results.filter(r => r.wcagAAA).length}/{results.length}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </details>
    </div>
  )
}

// Utility component to test custom color combinations
export function ColorContrastInput() {
  const [foreground, setForeground] = useState('#2C5530')
  const [background, setBackground] = useState('#FFFFFF')
  const [result, setResult] = useState<{
    ratio: number
    wcagAA: boolean
    wcagAAA: boolean
  } | null>(null)

  useEffect(() => {
    const fg = hexToRgb(foreground)
    const bg = hexToRgb(background)
    
    if (fg && bg) {
      const ratio = getContrastRatio(fg, bg)
      setResult({
        ratio: Math.round(ratio * 100) / 100,
        wcagAA: meetsWCAGAA(foreground, background),
        wcagAAA: meetsWCAGAAA(foreground, background)
      })
    }
  }, [foreground, background])

  return (
    <Card className="p-4 max-w-md">
      <h3 className="font-semibold mb-4">Test Custom Colors</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="foreground-color" className="block text-sm font-medium mb-2">
            Foreground Color
          </label>
          <input
            id="foreground-color"
            type="color"
            value={foreground}
            onChange={(e) => setForeground(e.target.value)}
            className="w-full h-10 rounded border border-gray-300"
          />
          <input
            type="text"
            value={foreground}
            onChange={(e) => setForeground(e.target.value)}
            className="mt-1 w-full px-3 py-1 text-sm border border-gray-300 rounded"
            placeholder="#000000"
          />
        </div>

        <div>
          <label htmlFor="background-color" className="block text-sm font-medium mb-2">
            Background Color
          </label>
          <input
            id="background-color"
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full h-10 rounded border border-gray-300"
          />
          <input
            type="text"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="mt-1 w-full px-3 py-1 text-sm border border-gray-300 rounded"
            placeholder="#FFFFFF"
          />
        </div>

        <div
          className="p-4 rounded border-2 border-dashed border-gray-300 text-center"
          style={{
            backgroundColor: background,
            color: foreground
          }}
        >
          Sample Text Preview
        </div>

        {result && (
          <div className="space-y-2">
            <div className="text-sm">
              <strong>Contrast Ratio:</strong> {result.ratio}:1
            </div>
            <div className="flex space-x-2">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  result.wcagAA
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                WCAG AA {result.wcagAA ? '✓' : '✗'}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  result.wcagAAA
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                WCAG AAA {result.wcagAAA ? '✓' : '✗'}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}