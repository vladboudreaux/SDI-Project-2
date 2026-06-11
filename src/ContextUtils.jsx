import { createContext, useContext, useState, useEffect } from 'react'

export const QuizContext = createContext()

export function useQuiz() {
    return useContext(QuizContext)
}

export function QuizProvider({ children }) {
    const [difficulty, setDifficulty] = useState('easy')
    const [numberOfQuestions, setNumberOfQuestions] = useState(5)
    const [started, setStarted] = useState(false)
    const [category, setCategory] = useState('')

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
        localStorage.clear()
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
            shuffledAnswers, setShuffledAnswers,
            category, setCategory
        }}>
            {children}
        </QuizContext.Provider>
    )
}


export function handleResponse(res) {
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    return res.json()
}


export const categories = [
    {
        "id": 9,
        "name": "General Knowledge"
    },
    {
        "id": 10,
        "name": "Entertainment: Books"
    },
    {
        "id": 11,
        "name": "Entertainment: Film"
    },
    {
        "id": 12,
        "name": "Entertainment: Music"
    },
    {
        "id": 13,
        "name": "Entertainment: Musicals & Theatres"
    },
    {
        "id": 14,
        "name": "Entertainment: Television"
    },
    {
        "id": 15,
        "name": "Entertainment: Video Games"
    },
    {
        "id": 16,
        "name": "Entertainment: Board Games"
    },
    {
        "id": 17,
        "name": "Science & Nature"
    },
    {
        "id": 18,
        "name": "Science: Computers"
    },
    {
        "id": 19,
        "name": "Science: Mathematics"
    },
    {
        "id": 20,
        "name": "Mythology"
    },
    {
        "id": 21,
        "name": "Sports"
    },
    {
        "id": 22,
        "name": "Geography"
    },
    {
        "id": 23,
        "name": "History"
    },
    {
        "id": 24,
        "name": "Politics"
    },
    {
        "id": 25,
        "name": "Art"
    },
    {
        "id": 26,
        "name": "Celebrities"
    },
    {
        "id": 27,
        "name": "Animals"
    },
    {
        "id": 28,
        "name": "Vehicles"
    },
    {
        "id": 29,
        "name": "Entertainment: Comics"
    },
    {
        "id": 30,
        "name": "Science: Gadgets"
    },
    {
        "id": 31,
        "name": "Entertainment: Japanese Anime & Manga"
    },
    {
        "id": 32,
        "name": "Entertainment: Cartoon & Animations"
    }
]


