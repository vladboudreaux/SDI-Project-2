import { useState, useEffect } from 'react'
import './App.css'
import { Outlet, Link } from 'react-router-dom'
import { handleResponse, useQuiz } from './ContextUtils'

function HomePage() {
    const { difficulty, numberOfQuestions, started, setStarted, triviaLogic, setTotalQuestions } = useQuiz()

    const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}`

    const [questions, setQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [shuffledAnswers, setShuffledAnswers] = useState([])

    useEffect(() => {
        if (!started) return

        fetch(url)
            .then(handleResponse)
            .then(json => {
                setQuestions(json.results)
                setSelectedAnswers({})
                setTotalQuestions(prev => prev + json.results.length)
                setShuffledAnswers(json.results.map(q =>
                    [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
                ))
            })
            .finally(() => setStarted(false))
    }, [started])

    const handleAnswer = (answer, correctAnswer, index) => {
        if (selectedAnswers[index]) return
        const isCorrect = triviaLogic(answer, correctAnswer)
        setSelectedAnswers(prev => ({ ...prev, [index]: { answer, isCorrect } }))
    }


    const decode = (str) => {
        const txt = document.createElement('textarea')
        txt.innerHTML = str
        return txt.value
    }

    return (
        <>
            <div className='questionsBox'>
                <h1> Trivia Time </h1>
                <ol>
                    {questions.map((q, index) => {
                        const allAnswers = [...(q.incorrect_answers || []), q.correct_answer].sort(() => Math.random() - 0.5)
                        return (
                            <div key={index}>
                                <li className='question'><strong>{decode(q.question)}</strong></li>
                                <div className='answersBox'>
                                    {shuffledAnswers[index]?.map((answer, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(answer, q.correct_answer, index)}
                                            style={{
                                                backgroundColor: selectedAnswers[index]?.answer === answer
                                                    ? selectedAnswers[index]?.isCorrect ? 'green' : 'red'
                                                    : ''
                                            }}>{decode(answer)}</button>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </ol>
            </div>
        </>
    )
}

export default HomePage