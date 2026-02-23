import { createContext, useContext, useState, useEffect } from "react"
import { getCompletedTasks, getAllSubTasks, getTodaysStudyime, insertStudySession, getSessions, getCourseDuration, insertCourse, checkSubTask, insertSubTask, deleteCourse, getProfile, deleteStudySession } from "./calculateCourses"
import { useAuth } from "../context/AuthContext"
import supabase from "../SupaBase"
const AppContext = createContext()


const AppContextProvider = ({ children }) => {
    const { user } = useAuth()
    const [courses, setCourses] = useState([])
    const [totalHoursUntilNow, setTotalHoursUntilNow] = useState(0)
    const [totalCourses, setTotalCourses] = useState(0)
    const [totalCompletedCourses, setTotalCompletedCourses] = useState(0)
    const [completedTasks, setCompletedTasks] = useState(0)
    const [timer, setTimer] = useState(55)
    const [sessionStarted, setSessionStarted] = useState(false)
    const [currentCourse, setCurrentCourse] = useState(null)
    const [studySessions, setStudySessions] = useState([])
    const [refetch, setRefetch] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalCourseDuration, setTotalCourseDuration] = useState(0)
    const [selectedColor, setSelectedColor] = useState("red")
    const [showAddCourseForm, setShowAddCourseForm] = useState(false)
    const [course, setCourse] = useState(null)
    const [error, setError] = useState([])

    useEffect(() => {
        if (!user) return;
        async function fetchData() {
            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('courses')
                    .select(`
                    *,
                    study_sessions(id,duration, date),
                    subtasks(id, title, completed, due_date)
                `)
                    .eq('user_id', user);

                if (error) throw error;
                setCourses(data)
                setTotalCourses(data.length)
                setCompletedTasks(getCompletedTasks(data));
                setTotalHoursUntilNow(getTodaysStudyime(data))
            } catch (error) {
                console.error("Error fetching courses:", error)
                setError(prev => [...prev, { type: "error", message: "An error occurred while fetching courses" }])
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [refetch, user])

    useEffect(() => {
        if (!user) return;
        async function fetchSessions() {
            try {
                const sessions = await getSessions(user)
                setStudySessions(sessions)
            } catch (error) {
                console.error("Error fetching sessions:", error)
                setError(prev => [...prev, { type: "error", message: "An error occurred while fetching sessions" }])
            }
        }
        fetchSessions()
    }, [refetch, user])

    var value = {
        user,
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
        setRefetch,
        loading,
        setLoading,
        totalCourseDuration,
        setTotalCourseDuration,
        getCourseDuration,
        selectedColor,
        setSelectedColor,
        showAddCourseForm,
        setShowAddCourseForm,
        insertCourse,
        getAllSubTasks,
        checkSubTask,
        insertSubTask,
        deleteCourse,
        course,
        setCourse,
        getProfile,
        deleteStudySession,
        error,
        setError
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
