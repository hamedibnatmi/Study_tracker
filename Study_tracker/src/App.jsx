import { useEffect, useState } from 'react'
import './App.css'
<<<<<<< HEAD
import History from './pages/History'
=======
import supabase from './SupaBase'
import SideBar from './components/sideBar'

>>>>>>> main
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
    <>
<<<<<<< HEAD
      <div>
        study tracker
        <History/>
=======
      <div className="app-container">

        <SideBar />
        <div className="main-content" style={{ color: "#ffffffff" }}>
          <h1>Study Trackers</h1>
        </div>
>>>>>>> main
      </div>
    </>
  )
}

export default App
