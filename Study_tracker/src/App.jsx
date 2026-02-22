import { useEffect, useState } from 'react'
import './App.css'
import supabase from './SupaBase'
import SideBar from './components/sideBar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import History from './pages/History'
import Profile from './pages/Profile'
import Login from "./pages/LogIn";


function App() {

  // This example how to fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("StudyTracker").select("*").eq("courses__userId", "user-001")
      if (error) {
        console.error("Error fetching courses:", error)
      } else {
        console.log("Fetched courses:", data)
      }
    }
    fetchData()
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      
      <Route
        path="/*"
        element={
          <div className="app-container">
            <SideBar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        }
      />
    </Routes>
  )
}

export default App
