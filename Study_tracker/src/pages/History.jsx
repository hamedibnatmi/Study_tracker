import { Trash2, Calendar, Clock, Circle } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import { Loader } from "@mantine/core"
const History = () => {
    const { studySessions, courses, deleteStudySession, refetch, setRefetch, setLoading, loading } = useAppContext()
    const calculteTime = (time) => {
        const hours = Math.floor(time / 60)
        const minutes = time % 60
        return `${hours}h ${minutes}m`
    }

    const getCourseTitle = (courseId) => {
        const course = courses.find((course) => course.id === courseId)
        return course ? course.title : "Unknown"
    }
    const getCourseColor = (courseId) => {
        const course = courses.find((course) => course.id === courseId)
        return course ? course.color : "#ccc"
    }
    const gettotalHoursUntilNow = () => {
        let totalTime = 0;
        studySessions.forEach((session) => {
            totalTime += session.duration
        })
        return totalTime
    }
    const handleDeleteSession = async (sessionId, userId) => {
        setLoading(true)
        try {
            await deleteStudySession(sessionId, userId)
            setRefetch(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="history-page">
            {loading && <div className="loader"><Loader /></div>}
            {!loading && <div className="title">
                <h1>Study History</h1>
                <h5>View your past study sessions</h5>
            </div>}
            {!loading && <div className="history-page-container">
                <div className="total-time-box">
                    <p>Total Study Time</p>
                    <p className="total-time">{calculteTime(gettotalHoursUntilNow())}</p>
                    <p className="total-sessions">{studySessions.length} sessions recorded</p>
                </div>
                {studySessions.length === 0 && <p className="no-sessions">You have no study sessions</p>}
                {studySessions.length > 0 && <div className="history-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studySessions.map((session) => (
                                <tr key={session.id}>
                                    <td className="course-title"><Circle size={15} style={{ marginRight: "5px", color: getCourseColor(session.course_id), backgroundColor: getCourseColor(session.course_id), borderRadius: "50%" }} />{getCourseTitle(session.course_id)}</td>
                                    <td><Clock size={15} style={{ marginRight: "5px" }} />{calculteTime(session.duration)}</td>
                                    <td><Calendar size={15} style={{ marginRight: "5px" }} />{new Date(session.date).toDateString()}</td>
                                    <td><button className="delete-action" onClick={() => handleDeleteSession(session.id, session.user_id)}><Trash2 /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}
            </div>}
        </div>
    )
}

export default History