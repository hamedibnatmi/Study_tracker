import { Trash2, Calendar, Clock, Circle } from "lucide-react"
import { useAppContext } from "../context/AppContext"
const History = () => {
    const { totalHoursUntilNow, totalSessions, completedTasks, studySessions, courses, getCourseDuration } = useAppContext()
    console.log("courses", courses)
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
    return (
        <div className="history-page">
            <div className="title">
                <h1>Study History</h1>
                <h5>View your past study sessions</h5>
            </div>
            <div className="history-page-container">
                <div className="total-time-box">
                    <p>Total Study Time</p>
                    <p className="total-time">{calculteTime(gettotalHoursUntilNow())}</p>
                    <p className="total-sessions">{studySessions.length} sessions recorded</p>
                </div>
                <div className="history-list">
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
                                    <td><Calendar size={15} style={{ marginRight: "5px" }} />{session.date}</td>
                                    <td><button className="delete-action"><Trash2 /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default History