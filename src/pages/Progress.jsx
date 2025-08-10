import React, { useState, useEffect } from 'react'
import { BarChart3, Trophy, Target, TrendingUp, Calendar, Clock, CheckCircle, XCircle, FileText } from 'lucide-react'
import { quizData } from '../data/quizData'

const Progress = () => {
  const [progressData, setProgressData] = useState({
    totalQuizzesTaken: 0,
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    averageScore: 0,
    timeSpent: 0,
    lastStudyDate: null,
    categoryProgress: {},
    practiceTestsTaken: 0,
    practiceTestScores: []
  })

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('g1StudyProgress')
    if (savedProgress) {
      setProgressData(JSON.parse(savedProgress))
    } else {
      // Initialize with default data
      const defaultProgress = {
        totalQuizzesTaken: 0,
        totalQuestionsAnswered: 0,
        correctAnswers: 0,
        averageScore: 0,
        timeSpent: 0,
        lastStudyDate: null,
        categoryProgress: {},
        practiceTestsTaken: 0,
        practiceTestScores: []
      }
      
      // Initialize category progress
      quizData.categories.forEach(category => {
        defaultProgress.categoryProgress[category.id] = {
          quizzesTaken: 0,
          bestScore: 0,
          averageScore: 0,
          lastAttempt: null
        }
      })
      
      setProgressData(defaultProgress)
      localStorage.setItem('g1StudyProgress', JSON.stringify(defaultProgress))
    }
  }, [])

  const getOverallProgress = () => {
    const totalCategories = quizData.categories.length
    const completedCategories = Object.values(progressData.categoryProgress)
      .filter(cat => cat.quizzesTaken > 0).length
    
    return Math.round((completedCategories / totalCategories) * 100)
  }

  const getStreakDays = () => {
    if (!progressData.lastStudyDate) return 0
    
    const lastDate = new Date(progressData.lastStudyDate)
    const today = new Date()
    const diffTime = Math.abs(today - lastDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays === 0 ? 1 : diffDays
  }

  const getRecommendations = () => {
    const recommendations = []
    
    if (progressData.averageScore < 70) {
      recommendations.push('Focus on reviewing the handbook before taking more quizzes')
    }
    
    if (progressData.totalQuizzesTaken < 3) {
      recommendations.push('Take more quizzes to build confidence in all categories')
    }
    
    const weakCategories = Object.entries(progressData.categoryProgress)
      .filter(([_, data]) => data.averageScore < 70 && data.quizzesTaken > 0)
      .map(([id, _]) => quizData.categories.find(cat => cat.id === id)?.name)
      .filter(Boolean)
    
    if (weakCategories.length > 0) {
      recommendations.push(`Review these categories: ${weakCategories.join(', ')}`)
    }
    
    if (progressData.practiceTestsTaken < 2) {
      recommendations.push('Take more practice tests to simulate the real exam environment')
    }
    
    return recommendations.length > 0 ? recommendations : ['Great job! Keep practicing to maintain your knowledge']
  }

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <BarChart3 className="mr-3 text-primary-600" size={32} />
          Your Study Progress
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track your learning journey and see how you're progressing toward your G1 test goals.
        </p>
      </div>

      {/* Overall Progress */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-primary-600" size={28} />
          </div>
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {getOverallProgress()}%
          </div>
          <div className="text-gray-600 font-medium">Overall Progress</div>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="text-green-600" size={28} />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {progressData.totalQuizzesTaken}
          </div>
          <div className="text-gray-600 font-medium">Quizzes Taken</div>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-blue-600" size={28} />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {progressData.averageScore}%
          </div>
          <div className="text-gray-600 font-medium">Average Score</div>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-purple-600" size={28} />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {getStreakDays()}
          </div>
          <div className="text-gray-600 font-medium">Study Streak</div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Quiz Performance */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="mr-2 text-green-600" size={24} />
            Quiz Performance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Questions:</span>
              <span className="font-semibold">{progressData.totalQuestionsAnswered}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Correct Answers:</span>
              <span className="font-semibold text-green-600">{progressData.correctAnswers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Accuracy Rate:</span>
              <span className="font-semibold">
                {progressData.totalQuestionsAnswered > 0 
                  ? Math.round((progressData.correctAnswers / progressData.totalQuestionsAnswered) * 100)
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Time Spent:</span>
              <span className="font-semibold">{formatTime(progressData.timeSpent)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Study:</span>
              <span className="font-semibold">{formatDate(progressData.lastStudyDate)}</span>
            </div>
          </div>
        </div>

        {/* Practice Tests */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText className="mr-2 text-blue-600" size={24} />
            Practice Tests
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tests Taken:</span>
              <span className="font-semibold">{progressData.practiceTestsTaken}</span>
            </div>
            {progressData.practiceTestScores.length > 0 && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Best Score:</span>
                  <span className="font-semibold text-green-600">
                    {Math.max(...progressData.practiceTestScores)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Score:</span>
                  <span className="font-semibold">
                    {Math.round(progressData.practiceTestScores.reduce((a, b) => a + b, 0) / progressData.practiceTestScores.length)}%
                  </span>
                </div>
              </>
            )}
            {progressData.practiceTestScores.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="mx-auto mb-2" size={32} />
                <p>No practice tests taken yet</p>
                <p className="text-sm">Start with a practice test to track your progress</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="card mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Category Progress</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizData.categories.map((category) => {
            const catProgress = progressData.categoryProgress[category.id] || {
              quizzesTaken: 0,
              bestScore: 0,
              averageScore: 0,
              lastAttempt: null
            }
            
            return (
              <div key={category.id} className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">{category.icon}</span>
                  <h4 className="font-semibold text-gray-900">{category.name}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quizzes:</span>
                    <span className="font-medium">{catProgress.quizzesTaken}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Score:</span>
                    <span className="font-medium text-green-600">
                      {catProgress.bestScore > 0 ? `${catProgress.bestScore}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average:</span>
                    <span className="font-medium">
                      {catProgress.averageScore > 0 ? `${catProgress.averageScore}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Attempt:</span>
                    <span className="font-medium text-xs">
                      {formatDate(catProgress.lastAttempt)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Target className="mr-2 text-orange-600" size={24} />
          Study Recommendations
        </h3>
        <div className="space-y-3">
          {getRecommendations().map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Progress
