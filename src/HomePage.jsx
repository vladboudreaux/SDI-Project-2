import { useState, useEffect } from 'react'
import './App.css'
import { Outlet, Link } from 'react-router-dom'
import { handleResponse, useQuiz } from './ContextUtils'

function HomePage() {
    const { difficulty, numberOfQuestions, started, setStarted } = useQuiz()
    const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}`

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if (!started) return

        fetch(url)
            .then(handleResponse)
            .then(json => setQuestions(json.results))
            .finally(() => setStarted(false))
    }, [started])

    const decode = (str) => {
        const txt = document.createElement('textarea')
        txt.innerHTML = str
        return txt.value
    }

    return (
        <>
            <div className='questionsBox'>
                <h1> Questions</h1>
                {questions.map((q, index) => {
                    const allAnswers = [...(q.incorrect_answers || []), q.correct_answer].sort(() => Math.random() - 0.5)
                    return (
                        <div key={index}>
                            <p className='question'><strong>{decode(q.question)}</strong></p>
                            <div className='answersBox'>
                                {allAnswers.map((answer, i) => (
                                    <button key={i}>{decode(answer)}</button>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default HomePage