import { createContext, useContext, useState } from "react"
const AppContext = createContext()


const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [courses, setCourses] = useState([])
    const [totalHours, setTotalHours] = useState(0)
    const [totalCourses, setTotalCourses] = useState(0)
    const [totalCompletedCourses, setTotalCompletedCourses] = useState(0)

    var value = {
        user,
        setUser,
        courses,
        setCourses,
        totalHours,
        setTotalHours,
        totalCourses,
        setTotalCourses,
        totalCompletedCourses,
        setTotalCompletedCourses
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("Failed to use AppContext")
    }
    return context
}

export { AppContextProvider, useAppContext }
