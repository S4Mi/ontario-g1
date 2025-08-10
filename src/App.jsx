import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Handbook from './pages/Handbook'
import Quizzes from './pages/Quizzes'
import PracticeTests from './pages/PracticeTests'
import Progress from './pages/Progress'
import OfflineIndicator from './components/OfflineIndicator'
import './App.css'

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check if app is installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      window.deferredPrompt = e
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <OfflineIndicator isOnline={isOnline} />
      <Navigation isInstalled={isInstalled} />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/handbook" element={<Handbook />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/practice-tests" element={<PracticeTests />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
