import React from 'react'
import { Wifi, WifiOff } from 'lucide-react'

const OfflineIndicator = ({ isOnline }) => {
  if (isOnline) return null

  return (
    <div className="offline-indicator fixed top-16 left-0 right-0 bg-red-600 text-white px-4 py-2 text-center z-40">
      <div className="flex items-center justify-center space-x-2">
        <WifiOff size={18} />
        <span className="text-sm font-medium">
          You're offline. Some features may be limited.
        </span>
      </div>
    </div>
  )
}

export default OfflineIndicator
