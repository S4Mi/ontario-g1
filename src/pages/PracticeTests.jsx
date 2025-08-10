import React, { useState, useEffect } from 'react'
import { FileText, Play, Clock, Target, CheckCircle, XCircle, ArrowLeft, RotateCcw, Trophy, AlertCircle } from 'lucide-react'
import { quizData } from '../data/quizData'

const PracticeTests = () => {
  const [testStarted, setTestStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [testQuestions, setTestQuestions] = useState([])
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // G1 test has 40 questions, 35 minutes
  const TOTAL_QUESTIONS = 40
  const TIME_LIMIT = 35 * 60 // 35 minutes in seconds

  const generateTestQuestions = () => {
    const allQuestions = []
    
    // Get questions from all categories
    Object.values(quizData.quizzes).forEach(categoryQuestions => {
      allQuestions.push(...categoryQuestions)
    })
    
    // Shuffle and select 40 questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, TOTAL_QUESTIONS)
  }

  const startTest = () => {
    const questions = generateTestQuestions()
    setTestQuestions(questions)
    setTestStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setTimeLeft(TIME_LIMIT)
    setIsTimerRunning(true)
    setTestCompleted(false)
    setShowReview(false)
  }

  const resetTest = () => {
    setTestStarted(false)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setTimeLeft(0)
    setIsTimerRunning(false)
    setTestCompleted(false)
    setShowReview(false)
    setTestQuestions([])
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeTest()
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const goToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex)
  }

  const completeTest = () => {
    setTestCompleted(true)
    setIsTimerRunning(false)
    
    // Save practice test results to progress
    const scorePercentage = getScorePercentage()
    const savedProgress = JSON.parse(localStorage.getItem('g1StudyProgress') || '{}')
    
    // Update practice test progress
    savedProgress.practiceTestsTaken = (savedProgress.practiceTestsTaken || 0) + 1
    if (!savedProgress.practiceTestScores) {
      savedProgress.practiceTestScores = []
    }
    savedProgress.practiceTestScores.push(scorePercentage)
    
    // Update overall progress
    savedProgress.lastStudyDate = new Date().toISOString()
    
    localStorage.setItem('g1StudyProgress', JSON.stringify(savedProgress))
  }

  const getScore = () => {
    let correct = 0
    testQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++
      }
    })
    return correct
  }

  const getScorePercentage = () => {
    return Math.round((getScore() / TOTAL_QUESTIONS) * 100)
  }

  const getPassStatus = () => {
    return getScore() >= 32 // Need 32/40 to pass (80%)
  }

  const getScoreMessage = () => {
    const percentage = getScorePercentage()
    if (percentage >= 90) return { message: 'Outstanding! You\'re definitely ready for the G1 test!', color: 'text-green-600' }
    if (percentage >= 80) return { message: 'Excellent! You\'re ready to take the G1 test.', color: 'text-green-600' }
    if (percentage >= 70) return { message: 'Good work! Review weak areas before taking the test.', color: 'text-yellow-600' }
    return { message: 'Keep studying! Focus on the handbook before attempting the test.', color: 'text-red-600' }
  }

  // Timer effect
  useEffect(() => {
    let interval = null
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTimerRunning) {
      completeTest()
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <FileText className="mr-3 text-primary-600" size={32} />
            Practice Tests
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simulate the actual G1 test with our comprehensive practice tests. Each test contains 40 questions with a 35-minute time limit.
          </p>
        </div>

        <div className="card max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-primary-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">G1 Practice Test</h2>
            <p className="text-gray-600 mb-6">
              Test your knowledge with questions covering all topics from the Ontario Driver's Handbook.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Target className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{TOTAL_QUESTIONS}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">35 min</div>
              <div className="text-sm text-gray-600">Time Limit</div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <AlertCircle className="text-blue-600 mr-3 mt-1" size={20} />
              <div className="text-sm text-blue-800">
                <strong>Test Format:</strong> Multiple choice questions covering traffic signs, road rules, safe driving, licensing, emergency procedures, and vehicle maintenance.
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startTest}
              className="btn-primary text-lg px-8 py-3"
            >
              <Play className="mr-2" size={20} />
              Start Practice Test
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (testCompleted) {
    const scoreMessage = getScoreMessage()
    const passed = getPassStatus()
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="mb-8">
            {passed ? (
              <Trophy className="w-20 h-20 text-green-500 mx-auto mb-4" />
            ) : (
              <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {passed ? 'Congratulations!' : 'Test Complete'}
            </h1>
            <p className="text-xl text-gray-600">
              You scored {getScore()} out of {TOTAL_QUESTIONS} questions
            </p>
          </div>

          <div className="mb-8">
            <div className={`text-6xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-yellow-600'}`}>
              {getScorePercentage()}%
            </div>
            <p className={`text-xl font-semibold ${scoreMessage.color}`}>
              {scoreMessage.message}
            </p>
            <div className="mt-4">
              <span className={`inline-block px-4 py-2 rounded-full text-lg font-medium ${
                passed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetTest}
              className="btn-primary text-lg px-8 py-3"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Menu
            </button>
            <button
              onClick={() => setShowReview(true)}
              className="btn-secondary text-lg px-8 py-3"
            >
              Review Answers
            </button>
            <button
              onClick={startTest}
              className="btn-secondary text-lg px-8 py-3"
            >
              <RotateCcw className="mr-2" size={20} />
              Take Another Test
            </button>
          </div>
        </div>

        {/* Review Section */}
        {showReview && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Test Review</h2>
            <div className="space-y-4">
              {testQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[index]
                const isCorrect = userAnswer === question.correct
                const isAnswered = userAnswer !== undefined
                
                return (
                  <div key={index} className={`card ${isCorrect ? 'border-green-200' : 'border-red-200'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <span className="font-medium text-gray-600">Question {index + 1}</span>
                      <div className="flex items-center space-x-2">
                        {isAnswered && (
                          isCorrect ? (
                            <CheckCircle className="text-green-600" size={20} />
                          ) : (
                            <XCircle className="text-red-600" size={20} />
                          )
                        )}
                        <span className={`text-sm font-medium ${
                          isCorrect ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-3">{question.question}</h3>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border-2 ${
                            optionIndex === question.correct
                              ? 'border-green-500 bg-green-50'
                              : optionIndex === userAnswer && !isCorrect
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <span className="font-medium text-gray-900">{option}</span>
                          {optionIndex === question.correct && (
                            <span className="ml-2 text-green-600 font-medium">✓ Correct Answer</span>
                          )}
                          {optionIndex === userAnswer && !isCorrect && (
                            <span className="ml-2 text-red-600 font-medium">✗ Your Answer</span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
                      <p className="text-gray-700">{question.explanation}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  const currentQ = testQuestions[currentQuestion]
  const userAnswer = selectedAnswers[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">G1 Practice Test</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Target className="mr-2" size={20} />
              <span className="font-medium">
                {currentQuestion + 1} / {TOTAL_QUESTIONS}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="mr-2" size={20} />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / TOTAL_QUESTIONS) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: TOTAL_QUESTIONS }, (_, index) => (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                index === currentQuestion
                  ? 'bg-primary-600 text-white'
                  : selectedAnswers[index] !== undefined
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQ?.question}
        </h2>

        <div className="space-y-3">
          {currentQ?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                userAnswer === index
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              <span className="font-medium text-gray-900">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            currentQuestion === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={completeTest}
          className="btn-secondary px-6 py-3"
        >
          Finish Test
        </button>
        
        <button
          onClick={nextQuestion}
          disabled={currentQuestion === TOTAL_QUESTIONS - 1}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            currentQuestion === TOTAL_QUESTIONS - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PracticeTests
