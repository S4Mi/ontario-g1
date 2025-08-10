import React, { useState, useRef } from 'react'
import { Search, BookOpen, ChevronRight, ChevronDown, Star, Bookmark } from 'lucide-react'
import { handbookData, trafficSigns } from '../data/handbookData'

const Handbook = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedSections, setExpandedSections] = useState(new Set(['getting-licence']))
  const [bookmarkedSections, setBookmarkedSections] = useState(new Set())
  const [activeSection, setActiveSection] = useState('getting-licence')
  const sectionRefs = useRef({})

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const toggleBookmark = (sectionId) => {
    const newBookmarked = new Set(bookmarkedSections)
    if (newBookmarked.has(sectionId)) {
      newBookmarked.delete(sectionId)
    } else {
      newBookmarked.add(sectionId)
    }
    setBookmarkedSections(newBookmarked)
  }

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    if (sectionRefs.current[sectionId]) {
      sectionRefs.current[sectionId].scrollIntoView({ behavior: 'smooth' })
    }
  }

  const filteredSections = handbookData.sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.some(item => 
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const searchResults = searchTerm ? handbookData.sections.flatMap(section =>
    section.content.filter(item =>
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(item => ({
      section: section.title,
      sectionId: section.id,
      ...item
    }))
  ) : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <BookOpen className="mr-3 text-primary-600" size={32} />
          Ontario Driver's Handbook
        </h1>
        <p className="text-gray-600 text-lg">
          Complete study material for your G1 driving test. All content is based on the official MTO Driver's Handbook.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search the handbook..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchTerm && searchResults.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Results</h3>
          <div className="space-y-3">
            {searchResults.slice(0, 5).map((result, index) => (
              <div
                key={index}
                className="card cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => scrollToSection(result.sectionId)}
              >
                <div className="text-sm text-primary-600 mb-1">{result.section}</div>
                <div className="font-semibold text-gray-900 mb-2">{result.subtitle}</div>
                <div className="text-gray-600 text-sm">{result.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Table of Contents */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
            <nav className="space-y-2">
              {handbookData.sections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {section.title}
                  </button>
                </div>
              ))}
            </nav>

            {/* Quick Reference */}
            <div className="mt-8">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Quick Reference</h4>
              <div className="space-y-3">
                <div className="card p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Speed Limits</h5>
                  {Object.entries(handbookData.quickReference.speedLimits).map(([area, limit]) => (
                    <div key={area} className="flex justify-between text-sm">
                      <span className="text-gray-600">{area}:</span>
                      <span className="font-medium">{limit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="card p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Stopping Distances</h5>
                  {Object.entries(handbookData.quickReference.stoppingDistances).map(([item, distance]) => (
                    <div key={item} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item}:</span>
                      <span className="font-medium">{distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="space-y-8">
            {filteredSections.map((section) => (
              <div
                key={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="handbook-section"
              >
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                    <button
                      onClick={() => toggleBookmark(section.id)}
                      className={`p-2 rounded-full transition-colors ${
                        bookmarkedSections.has(section.id)
                          ? 'text-yellow-500 hover:text-yellow-600'
                          : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Bookmark size={20} fill={bookmarkedSections.has(section.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {section.content.map((item, index) => (
                      <div key={index} className="border-l-4 border-primary-200 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.subtitle}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Traffic Signs Section */}
          <div className="mt-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Traffic Signs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trafficSigns.map((sign, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">{sign.image}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{sign.name}</h3>
                    <p className="text-sm text-gray-600">{sign.description}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                      sign.category === 'regulatory' ? 'bg-red-100 text-red-800' :
                      sign.category === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {sign.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Handbook
