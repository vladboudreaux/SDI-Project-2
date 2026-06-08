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

    useEffect(() => {
        localStorage.setItem('incorrectAnswerCount', incorrectAnswerCount)
    }, [incorrectAnswerCount])

    useEffect(() => {
        localStorage.setItem('correctAnswerCount', correctAnswerCount)
    }, [correctAnswerCount])

    const clearScore = () => {
        setCorrectAnswerCount(0)
        setIncorrectAnswerCount(0)
        localStorage.removeItem('correctAnswerCount')
        localStorage.removeItem('incorrectAnswerCount')
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
            clearScore
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