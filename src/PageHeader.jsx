import { useState, useEffect, useContext } from 'react'
import './App.css'
import { Outlet, Link } from 'react-router-dom'
import { useQuiz } from './ContextUtils'

function PageHeader() {
    const { difficulty, setDifficulty,
        numberOfQuestions, setNumberOfQuestions,
        started, setStarted,
        correctAnswerCount, setCorrectAnswerCount,
        incorrectAnswerCount, setIncorrectAnswerCount,
        clearScore,
        totalQuestions }
        = useQuiz()

    return (
        <>
            <div className='pageHeader'>
                <div className='modifiers'>
                    <label htmlFor='selectDifficulty'> Select Difficulty: </label>
                    <select name='selectDifficulty' id='selectDifficulty' value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                    <p> Number of Questions: </p>
                    <input placeholder='number of questions' value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(e.target.value)} />
                </div>
                <button onClick={() => setStarted(true)}> Start Trivia! </button>
                <div className='scoreCard'>
                    <p> Correct: {correctAnswerCount}</p>
                    <p> Incorrect: {incorrectAnswerCount} </p>
                    <p> Total: {totalQuestions}</p>
                    <p> Score: % {totalQuestions > 0 ? (correctAnswerCount / totalQuestions * 100).toFixed(1) : 0}</p>
                    <button onClick={clearScore}> Clear Score </button>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default PageHeader