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
import { Navigate } from 'react-router-dom'
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

  const { user } = useAuth()

  return (
    <>
      <div className="app-container">
        <SideBar />
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <LogIn />} />
          <Route path="/history" element={user ? <History /> : <LogIn />} />
          <Route path="/profile" element={user ? <Profile /> : <LogIn />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <LogIn />} />
        </Routes>
      </div>
    </>
  )
}

export default App
