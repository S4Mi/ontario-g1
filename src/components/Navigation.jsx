import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, BookOpen, Brain, FileText, BarChart3, Home, Download } from 'lucide-react'

const Navigation = ({ isInstalled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/handbook', label: 'Handbook', icon: BookOpen },
    { path: '/quizzes', label: 'Quizzes', icon: Brain },
    { path: '/practice-tests', label: 'Practice Tests', icon: FileText },
    { path: '/progress', label: 'Progress', icon: BarChart3 },
  ]

  const handleInstallClick = () => {
    // Check if the app can be installed
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt()
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
          setIsInstalled(true)
        } else {
          console.log('User dismissed the install prompt')
        }
        window.deferredPrompt = null
      })
    } else {
      // Fallback for browsers that don't support the install prompt
      alert('To install this app, look for the install button in your browser\'s address bar or menu.')
    }
    setShowInstallPrompt(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G1</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Study App</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Install Button */}
            {!isInstalled && (
              <button
                onClick={() => setShowInstallPrompt(true)}
                className="hidden md:flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Download size={18} />
                <span>Install</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.path)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              {!isInstalled && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    setShowInstallPrompt(true)
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                >
                  <Download size={20} />
                  <span>Install App</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Install Prompt Modal */}
      {showInstallPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Install G1 Study App
            </h3>
            <p className="text-gray-600 mb-6">
              Install this app on your device for quick access and offline use.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleInstallClick}
                className="flex-1 btn-primary"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation
