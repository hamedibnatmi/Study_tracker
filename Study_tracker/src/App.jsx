import { useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import './App.css'
import supabase from './SupaBase'
import SideBar from './components/sideBar'
import { Routes, Route } from 'react-router-dom'

import Dashboard from './pages/dashboard'
import History from './pages/History'
import Profile from './pages/Profile'

import LogIn from './pages/LogIn'
import CoursePage from './pages/CoursePage'
import { Navigate, Outlet } from 'react-router-dom'


function App() {
  // This example how to fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("courses").select("*").eq("courses__userId", "user-001")
      if (error) {
        console.error("Error fetching courses:", error)
      } else {
        console.log("Fetched courses:", data)
      }
    }
    // fetchData()
  }, [])

  function ProtectedLayout() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    return (
      <div className="app-container">
        <SideBar />
        <Outlet />
      </div>
    );
  }
  return (

    <>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<LogIn />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/course/:id" element={<CoursePage />} />
          </Route>
        </Routes>
      </div>
    </>

  )
}

export default App
