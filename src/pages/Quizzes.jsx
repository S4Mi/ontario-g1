import React, { useState } from 'react'
import { Brain, CheckCircle, XCircle, ArrowLeft, RotateCcw, Trophy, Clock, Target } from 'lucide-react'
import { quizData } from '../data/quizData'

const Quizzes = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const startQuiz = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
    setTimeLeft(300) // 5 minutes
    setIsTimerRunning(true)
  }

  const resetQuiz = () => {
    setSelectedCategory(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
    setTimeLeft(0)
    setIsTimerRunning(false)
  }

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return // Prevent multiple selections
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    // Update progress tracking
    const isCorrect = answerIndex === question.correct
    if (isCorrect) {
      setScore(score + 1)
    }
    
    // Save progress to localStorage
    const savedProgress = JSON.parse(localStorage.getItem('g1StudyProgress') || '{}')
    const categoryId = selectedCategory
    
    if (!savedProgress.categoryProgress) {
      savedProgress.categoryProgress = {}
    }
    
    if (!savedProgress.categoryProgress[categoryId]) {
      savedProgress.categoryProgress[categoryId] = {
        quizzesTaken: 0,
        bestScore: 0,
        averageScore: 0,
        lastAttempt: null
      }
    }
    
    // Update category progress
    const catProgress = savedProgress.categoryProgress[categoryId]
    catProgress.lastAttempt = new Date().toISOString()
    
    // Update overall progress
    savedProgress.totalQuestionsAnswered = (savedProgress.totalQuestionsAnswered || 0) + 1
    savedProgress.correctAnswers = (savedProgress.correctAnswers || 0) + (isCorrect ? 1 : 0)
    savedProgress.lastStudyDate = new Date().toISOString()
    
    localStorage.setItem('g1StudyProgress', JSON.stringify(savedProgress))
  }

  const nextQuestion = () => {
    if (currentQuestion < quizData.quizzes[selectedCategory].length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
      setIsTimerRunning(false)
      
      // Save final quiz results to progress
      const savedProgress = JSON.parse(localStorage.getItem('g1StudyProgress') || '{}')
      const categoryId = selectedCategory
      const finalScore = score + (selectedAnswer === getCurrentQuestion().correct ? 1 : 0)
      const scorePercentage = Math.round((finalScore / quizData.quizzes[selectedCategory].length) * 100)
      
      if (!savedProgress.categoryProgress) {
        savedProgress.categoryProgress = {}
      }
      
      if (!savedProgress.categoryProgress[categoryId]) {
        savedProgress.categoryProgress[categoryId] = {
          quizzesTaken: 0,
          bestScore: 0,
          averageScore: 0,
          lastAttempt: null
        }
      }
      
      // Update category progress
      const catProgress = savedProgress.categoryProgress[categoryId]
      catProgress.quizzesTaken = (catProgress.quizzesTaken || 0) + 1
      catProgress.lastAttempt = new Date().toISOString()
      
      if (scorePercentage > (catProgress.bestScore || 0)) {
        catProgress.bestScore = scorePercentage
      }
      
      // Calculate new average
      const totalScore = (catProgress.averageScore || 0) * (catProgress.quizzesTaken - 1) + scorePercentage
      catProgress.averageScore = Math.round(totalScore / catProgress.quizzesTaken)
      
      // Update overall progress
      savedProgress.totalQuizzesTaken = (savedProgress.totalQuizzesTaken || 0) + 1
      savedProgress.averageScore = Math.round(
        (savedProgress.averageScore * (savedProgress.totalQuizzesTaken - 1) + scorePercentage) / savedProgress.totalQuizzesTaken
      )
      
      localStorage.setItem('g1StudyProgress', JSON.stringify(savedProgress))
    }
  }

  const getCurrentQuestion = () => {
    return quizData.quizzes[selectedCategory][currentQuestion]
  }

  const getScorePercentage = () => {
    return Math.round((score / quizData.quizzes[selectedCategory].length) * 100)
  }

  const getScoreMessage = () => {
    const percentage = getScorePercentage()
    if (percentage >= 90) return { message: 'Excellent! You\'re ready for the test!', color: 'text-green-600' }
    if (percentage >= 80) return { message: 'Great job! Keep studying to improve.', color: 'text-blue-600' }
    if (percentage >= 70) return { message: 'Good work! Review the handbook for better results.', color: 'text-yellow-600' }
    return { message: 'Keep studying! Review the handbook thoroughly.', color: 'text-red-600' }
  }

  // Timer effect
  React.useEffect(() => {
    let interval = null
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTimerRunning) {
      setQuizCompleted(true)
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Brain className="mr-3 text-primary-600" size={32} />
            Interactive Quizzes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test your knowledge with topic-specific quizzes. Each quiz contains 5 questions with immediate feedback and explanations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizData.categories.map((category) => (
            <div
              key={category.id}
              className="card cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => startQuiz(category.id)}
            >
              <div className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <span className="text-3xl">{category.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {category.name}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {category.description}
              </p>
              <div className="text-center">
                <span className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
                  {quizData.quizzes[category.id].length} Questions
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    const scoreMessage = getScoreMessage()
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="mb-8">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
            <p className="text-xl text-gray-600">
              You scored {score} out of {quizData.quizzes[selectedCategory].length} questions
            </p>
          </div>

          <div className="mb-8">
            <div className="text-6xl font-bold text-primary-600 mb-4">
              {getScorePercentage()}%
            </div>
            <p className={`text-xl font-semibold ${scoreMessage.color}`}>
              {scoreMessage.message}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="btn-primary text-lg px-8 py-3"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Categories
            </button>
            <button
              onClick={() => startQuiz(selectedCategory)}
              className="btn-secondary text-lg px-8 py-3"
            >
              <RotateCcw className="mr-2" size={20} />
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = getCurrentQuestion()
  const isCorrect = selectedAnswer === question.correct

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={resetQuiz}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Categories
        </button>
        
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {quizData.categories.find(c => c.id === selectedCategory)?.name}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Target className="mr-2" size={20} />
              <span className="font-medium">
                {currentQuestion + 1} / {quizData.quizzes[selectedCategory].length}
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
            style={{ width: `${((currentQuestion + 1) / quizData.quizzes[selectedCategory].length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === null
                  ? 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                  : selectedAnswer === index
                  ? index === question.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : index === question.correct
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center">
                {selectedAnswer !== null && (
                  <div className="mr-3">
                    {index === question.correct ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : selectedAnswer === index ? (
                      <XCircle className="text-red-600" size={20} />
                    ) : null}
                  </div>
                )}
                <span className="font-medium text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Result and Explanation */}
      {showResult && (
        <div className="card mb-6">
          <div className={`text-center mb-4 ${
            isCorrect ? 'text-green-600' : 'text-red-600'
          }`}>
            <div className="text-4xl mb-2">
              {isCorrect ? '✅' : '❌'}
            </div>
            <h3 className="text-xl font-semibold">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </h3>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
            <p className="text-gray-700">{question.explanation}</p>
          </div>

          <div className="text-center">
            <button
              onClick={nextQuestion}
              className="btn-primary px-8 py-3"
            >
              {currentQuestion < quizData.quizzes[selectedCategory].length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Quizzes
