import { useState, useEffect, useContext } from 'react'
import './App.css'
import { Outlet, Link } from 'react-router-dom'
import { categories, useQuiz } from './ContextUtils'

function PageHeader() {
    const { difficulty, setDifficulty,
        numberOfQuestions, setNumberOfQuestions,
        started, setStarted,
        correctAnswerCount, setCorrectAnswerCount,
        incorrectAnswerCount, setIncorrectAnswerCount,
        clearScore, category, setCategory,
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
                    <label htmlFor='selectCategory'> Select Category: </label>
                    <select name='selectCategory' id='selectCategory' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value=''>Any Category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <p> Number of Questions: </p>
                    <input id='numberOfQuestions' placeholder='number of questions' value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(e.target.value)} />
                </div>
                <div className='startButton'>
                    <button onClick={() => setStarted(true)}> Start Trivia! </button>
                </div>
                <div className='scoreCard'>
                    <p> Correct: {correctAnswerCount}</p>
                    <p> Incorrect: {incorrectAnswerCount} </p>
                    <p> Total: {totalQuestions}</p>
                    <p> Score: % {totalQuestions > 0 ? (correctAnswerCount / totalQuestions * 100).toFixed(1) : 0}</p>
                    <button onClick={() => {
                        clearScore()
                        window.location.reload()
                    }}> Reset </button>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default PageHeader