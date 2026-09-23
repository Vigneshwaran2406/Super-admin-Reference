import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { PerspectiveProvider } from '@/context/PerspectiveContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PerspectiveProvider>
      <RouterProvider router={router} />
    </PerspectiveProvider>
  </React.StrictMode>
)
