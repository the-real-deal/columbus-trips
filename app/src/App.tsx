import { BrowserRouter, Routes, Route } from 'react-router'

import AuthPage from './pages/user/authentication.tsx'
import LandingPage from './pages/user/landing.tsx'
import Home from './pages/user/home.tsx'
import Trip from './pages/user/trip-details.tsx'
import AdminDashboard from './pages/admin/dashboard.tsx'
import POIInsertion from './pages/poi-insertion.tsx'
import GroupsView from './pages/user/groups-view.tsx'
import NotFound from './pages/not-found.tsx'
import TripCreation from './pages/user/trip-creation.tsx'
import MyTrips from './pages/user/my-trips.tsx'
import MyPois from './pages/user/my-pois.tsx'
import { useAuth } from './auth/AuthContext.ts'

export default function App() {
    return <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route index path="/" element={<LandingPage />}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/my-groups' element={<GroupsView/>}/>
        <Route path='/my-trips' element={<MyTrips/>}/>
        <Route path='/my-pois' element={<MyPois/>}/>
        <Route path='/trip/:tripId' element={<Trip/>}/>
        <Route path='/dashboard' element={<AdminDashboard/>}/>
        <Route path='/new-trip' element={<TripCreation/>}/>
        <Route path='/new-poi' element={<POIInsertion/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
}