import { useEffect, useState } from 'react'
import './App.css'
import supabase from './SupaBase'

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
      <div>

        study tracker
      </div>
    </>
  )
}

export default App
