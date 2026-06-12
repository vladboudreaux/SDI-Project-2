import { useState, useEffect } from 'react'
import './App.css'
import { Outlet, Link } from 'react-router-dom'
import { handleResponse, useQuiz } from './ContextUtils'

function HomePage() {
    const {
        difficulty, numberOfQuestions, started, setStarted,
        triviaLogic, setTotalQuestions, questions,
        setQuestions, selectedAnswers, setSelectedAnswers,
        shuffledAnswers, setShuffledAnswers, category, } = useQuiz()

    const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}${category ? `&category=${category}` : ''}`



    useEffect(() => {
        if (!started) return

        fetch(url)
            .then(handleResponse)
            .then(json => {
                setQuestions(prev => [...json.results, ...prev])
                // setSelectedAnswers({})
                setTotalQuestions(prev => prev + json.results.length)
                setShuffledAnswers(prev => [
                    ...json.results.map(q =>
                        [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
                    ), ...prev
                ])
            })
            .finally(() => setStarted(false))
    }, [started])

    const handleAnswer = (answer, correctAnswer, question) => {
        if (selectedAnswers[question]) return
        const isCorrect = triviaLogic(answer, correctAnswer)
        setSelectedAnswers(prev => ({ ...prev, [question]: { answer, isCorrect } }))
    }


    const decode = (str) => {
        const txt = document.createElement('textarea')
        txt.innerHTML = str
        console.log(txt.value)
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
                                    {shuffledAnswers[index].map((answer, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(answer, q.correct_answer, q.question)}
                                            style={{
                                                backgroundColor: (() => {
                                                    const selected = selectedAnswers[q.question]
                                                    if (!selected) return ''
                                                    if (answer === q.correct_answer) return 'green'
                                                    if (selected.answer === answer) return 'red'
                                                    return ''
                                                })()
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