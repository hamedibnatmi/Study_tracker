import { createContext, useContext, useState, useEffect } from "react"
import { getCompletedTasks } from "./calculateCourses"
import supabase from "../SupaBase"
const AppContext = createContext()


const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState("user-001")
    const [courses, setCourses] = useState([])
    const [totalHoursUntilNow, setTotalHoursUntilNow] = useState(0)
    const [totalCourses, setTotalCourses] = useState(0)
    const [totalCompletedCourses, setTotalCompletedCourses] = useState(0)
    const [completedTasks, setCompletedTasks] = useState(0)

    useEffect(() => {
        async function fetchData() {

            const { data, error } = await supabase
                .from('courses')
                .select(`
                    *,
                    study_sessions(duration, date),
                    subtasks(id, title, completed)
                `)
                .eq('user_id', user);

            setCourses(data)
            setTotalCourses(data.length)
            setCompletedTasks(getCompletedTasks(data));
            setTotalHoursUntilNow(data.reduce((acc, course) => acc + course.courses__hours, 0))

            if (error) {
                console.error("Error fetching courses:", error)
            } else {
                console.log("Fetched courses:", data)
            }
        }
        fetchData()
    }, [])

    var value = {
        user,
        setUser,
        courses,
        setCourses,
        totalHoursUntilNow,
        setTotalHoursUntilNow,
        totalCourses,
        setTotalCourses,
        totalCompletedCourses,
        setTotalCompletedCourses,
        completedTasks,
        setCompletedTasks
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
