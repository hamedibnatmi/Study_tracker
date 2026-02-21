import { useEffect } from 'react'
import './App.css'
import supabase from './SupaBase'
import SideBar from './components/sideBar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import History from './pages/History'
import Profile from './pages/Profile'
import LogIn from './pages/LogIn'

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

  return (
    <>
      <div className="app-container">

        <SideBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </>
  )
}

export default App
