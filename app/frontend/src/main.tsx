import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import AuthPage from './pages/authentication.tsx'
import LandingPage from './pages/landing.tsx'
import Home from './pages/home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route index path="/" element={<LandingPage />}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
