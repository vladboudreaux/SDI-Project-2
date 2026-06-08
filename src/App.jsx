import { useState, useContext } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './App.css'
import PageHeader from './PageHeader'
import HomePage from './HomePage'
import { QuizProvider } from './ContextUtils'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageHeader />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
    ]
  }
])

function App() {
  return (
    <QuizProvider>
      <RouterProvider router={router} />
    </QuizProvider>
  )
}

export default App