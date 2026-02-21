import { createContext, useContext, useState, useEffect } from "react"
import { getCompletedTasks, getTodaysStudyime, insertStudySession, getSessions } from "./calculateCourses"
import supabase from "../SupaBase"
const AppContext = createContext()


const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState("user-001")
    const [courses, setCourses] = useState([])
    const [totalHoursUntilNow, setTotalHoursUntilNow] = useState(0)
    const [totalCourses, setTotalCourses] = useState(0)
    const [totalCompletedCourses, setTotalCompletedCourses] = useState(0)
    const [completedTasks, setCompletedTasks] = useState(0)
    const [timer, setTimer] = useState(0)
    const [sessionStarted, setSessionStarted] = useState(false)
    const [currentCourse, setCurrentCourse] = useState(null)
    const [studySessions, setStudySessions] = useState([])
    const [refetch, setRefetch] = useState(false)
    useEffect(() => {
        async function fetchData() {

            const { data, error } = await supabase
                .from('courses')
                .select(`
                    *,
                    study_sessions(id,duration, date),
                    subtasks(id, title, completed)
                `)
                .eq('user_id', user);

            setCourses(data)
            setTotalCourses(data.length)
            setCompletedTasks(getCompletedTasks(data));
            setTotalHoursUntilNow(getTodaysStudyime(data))

            if (error) {
                console.error("Error fetching courses:", error)
            } else {
                console.log("Fetched courses:", data)
            }
        }
        fetchData()
    }, [refetch])

    useEffect(() => {
        async function fetchSessions() {
            const sessions = await getSessions(user)
            setStudySessions(sessions)
        }
        fetchSessions()
    }, [refetch])

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
        setCompletedTasks,
        timer,
        setTimer,
        sessionStarted,
        setSessionStarted,
        currentCourse,
        setCurrentCourse,
        insertStudySession,
        studySessions,
        setStudySessions,
        refetch,
        setRefetch
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
