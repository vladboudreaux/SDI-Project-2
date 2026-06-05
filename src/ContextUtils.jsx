import { createContext, useContext, useState } from 'react'

export const QuizContext = createContext()

export function QuizProvider({ children }) {
    const [difficulty, setDifficulty] = useState('easy')
    const [numberOfQuestions, setNumberOfQuestions] = useState(10)
    const [started, setStarted] = useState(false)

    return (
        <QuizContext.Provider value={{ difficulty, setDifficulty, numberOfQuestions, setNumberOfQuestions, started, setStarted }}>
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