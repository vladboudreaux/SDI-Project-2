import { createContext, useContext, useState, useEffect } from 'react'

export const QuizContext = createContext()

export function QuizProvider({ children }) {
    const [difficulty, setDifficulty] = useState('easy')
    const [numberOfQuestions, setNumberOfQuestions] = useState(10)
    const [started, setStarted] = useState(false)

    const [correctAnswerCount, setCorrectAnswerCount] = useState(
        () => parseInt(localStorage.getItem('correctAnswerCount')) || 0
    )
    const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(
        () => parseInt(localStorage.getItem('incorrectAnswerCount')) || 0
    )

    const [totalQuestions, setTotalQuestions] = useState(
        () => parseInt(localStorage.getItem('totalQuestions')) || 0
    )

    const [questions, setQuestions] = useState(
        () => JSON.parse(localStorage.getItem('questions')) || []
    )

    const [selectedAnswers, setSelectedAnswers] = useState(
        () => JSON.parse(localStorage.getItem('selectedAnswers')) || {}
    )

    const [shuffledAnswers, setShuffledAnswers] = useState(
        () => JSON.parse(localStorage.getItem('shuffledAnswers')) || []
    )

    useEffect(() => {
        localStorage.setItem('questions', JSON.stringify(questions))
    }, [questions])

    useEffect(() => {
        localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers))
    }, [selectedAnswers])

    useEffect(() => {
        localStorage.setItem('shuffledAnswers', JSON.stringify(shuffledAnswers))
    }, [shuffledAnswers])

    useEffect(() => {
        localStorage.setItem('incorrectAnswerCount', incorrectAnswerCount)
    }, [incorrectAnswerCount])

    useEffect(() => {
        localStorage.setItem('correctAnswerCount', correctAnswerCount)
    }, [correctAnswerCount])

    useEffect(() => {
        localStorage.setItem('totalQuestions', totalQuestions)
    }, [totalQuestions])

    const clearScore = () => {
        setCorrectAnswerCount(0)
        setIncorrectAnswerCount(0)
        setTotalQuestions(0)
        setQuestions([])
        setSelectedAnswers({})
        setShuffledAnswers([])
        localStorage.removeItem('correctAnswerCount')
        localStorage.removeItem('incorrectAnswerCount')
        localStorage.removeItem('totalQuestions')
        localStorage.removeItem('questions')
        localStorage.removeItem('selectedAnswers')
        localStorage.removeItem('shuffledAnswers')
    }

    const triviaLogic = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            setCorrectAnswerCount(prev => prev + 1)
            return true
        } else {
            setIncorrectAnswerCount(prev => prev + 1)
            return false
        }
    }

    return (
        <QuizContext.Provider value={{
            difficulty, setDifficulty,
            numberOfQuestions, setNumberOfQuestions,
            started, setStarted,
            correctAnswerCount, setCorrectAnswerCount,
            incorrectAnswerCount, setIncorrectAnswerCount,
            triviaLogic,
            clearScore,
            totalQuestions, setTotalQuestions,
            questions, setQuestions,
            selectedAnswers, setSelectedAnswers,
            shuffledAnswers, setShuffledAnswers
        }}>
            {children}
        </QuizContext.Provider>
    )
}

export function useQuiz() {
    return useContext(QuizContext)
}

export function handleResponse(res) {
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    return res.json()
}


export const categories = [

]