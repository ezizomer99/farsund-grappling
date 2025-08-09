'use client'

import { useEffect } from 'react'

export default function StudioPage() {
  useEffect(() => {
    // Redirect to the hosted Sanity Studio
    window.location.href = `https://farsundgrappling.sanity.studio`
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Redirecting to Sanity Studio...</h2>
        <p className="text-gray-600">
          If you are not redirected automatically, 
          <a 
            href="https://farsundgrappling.sanity.studio" 
            className="text-blue-600 hover:underline ml-1"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  )
}
