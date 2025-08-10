import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Brain, FileText, BarChart3, Car, Shield, Clock, Award } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Complete Handbook',
      description: 'Study the official MTO driver\'s handbook with easy navigation and search.',
      path: '/handbook',
      color: 'bg-blue-500'
    },
    {
      icon: Brain,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with topic-specific quizzes and immediate feedback.',
      path: '/quizzes',
      color: 'bg-green-500'
    },
    {
      icon: FileText,
      title: 'Practice Tests',
      description: 'Simulate the actual G1 test with randomized questions and timed sessions.',
      path: '/practice-tests',
      color: 'bg-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your study progress and identify areas for improvement.',
      path: '/progress',
      color: 'bg-orange-500'
    }
  ]

  const stats = [
    { icon: Car, label: 'Road Rules', value: '100+' },
    { icon: Shield, label: 'Safety Tips', value: '50+' },
    { icon: Clock, label: 'Study Time', value: 'Flexible' },
    { icon: Award, label: 'Success Rate', value: '95%' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Master Your
          <span className="text-primary-600"> G1 Test</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Comprehensive study materials, interactive quizzes, and practice tests to help you pass your Ontario G1 driving test with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/handbook" className="btn-primary text-lg px-8 py-3">
            Start Studying
          </Link>
          <Link to="/practice-tests" className="btn-secondary text-lg px-8 py-3">
            Take Practice Test
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Link
              key={index}
              to={feature.path}
              className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </Link>
          )
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Why Choose Our Study App?
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary-600" size={28} />
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl text-white p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Quick Start Guide
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Read the Handbook</h3>
            <p className="text-primary-100 text-sm">
              Start with the complete driver's handbook to understand the basics
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Take Quizzes</h3>
            <p className="text-primary-100 text-sm">
              Test your knowledge with interactive quizzes on specific topics
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Practice Tests</h3>
            <p className="text-primary-100 text-sm">
              Simulate the real test environment with timed practice tests
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of successful drivers who used our app to pass their G1 test.
        </p>
        <Link to="/handbook" className="btn-primary text-lg px-8 py-3">
          Begin Studying Now
        </Link>
      </div>
    </div>
  )
}

export default Home
