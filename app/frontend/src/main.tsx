import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import AuthPage from './pages/user/authentication.tsx'
import LandingPage from './pages/user/landing.tsx'
import Home from './pages/user/home.tsx'
import Trip from './pages/user/trip-details.tsx'
import AdminDashboard from './pages/admin/dashboard.tsx'
import POIInsertion from './pages/poi-insertion.tsx'
import GroupsView from './pages/user/groups-view.tsx'
import NotFound from './pages/not-found.tsx'
import TripCreation from './pages/user/trip-creation.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route index path="/" element={<LandingPage />}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/my-groups' element={<GroupsView/>}/>
        <Route path='/trip/:tripId' element={<Trip/>}/>
        <Route path='/dashboard' element={<AdminDashboard/>}/>
        <Route path='/new-trip' element={<TripCreation/>}/>
        <Route path='/new-poi' element={<POIInsertion/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
