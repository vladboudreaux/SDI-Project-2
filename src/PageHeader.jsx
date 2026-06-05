import { useState, useEffect, useContext } from 'react'
import './App.css'
import { Outlet, Link } from 'react-router-dom'
import { useQuiz } from './ContextUtils'

function PageHeader() {
    const { difficulty, setDifficulty, numberOfQuestions, setNumberOfQuestions, started, setStarted } = useQuiz()

    return (
        <>
            <div className='pageHeader'>
                <h1> Trivia Time<br /> </h1>
                <label htmlFor='selectDifficulty'> Select Difficulty: </label>
                <select name='selectDifficulty' id='selectDifficulty' value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>
                <input placeholder='number of questions' value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(e.target.value)} />
                <button onClick={() => setStarted(true)}> Start Trivia! </button>
            </div>
            <Outlet />
        </>
    )
}

export default PageHeader