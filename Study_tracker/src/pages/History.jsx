import { Trash2, Calendar } from "lucide-react"
import { useAppContext } from "../context/AppContext"
const History = () => {
    const { totalHoursUntilNow, totalSessions, completedTasks, studySessions, courses, getCourseDuration } = useAppContext()
    console.log("courses", courses)
    const calculteTime = (time) => {
        const hours = Math.floor(time / 60)
        const minutes = time % 60
        return `${hours}h ${minutes}m`
    }
    return (
        <div className="history-page">
            <div className="title">
                <h1>Study History</h1>
                <h5>Here's your study history.</h5>
            </div>
            <div className="history-page-container">
                <div className="total-time-box">
                    <p>Total Study Time</p>
                    <p className="total-time">{calculteTime(totalHoursUntilNow)}</p>
                    <p className="total-sessions">{studySessions.length} sessions recorded</p>
                </div>
                <div className="history-list">
                    <p>History</p>
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
                            {courses.map((course) => (
                                <tr key={course.id}>
                                    <td>{course.title}</td>
                                    <td>{getCourseDuration(course.study_sessions)}</td>
                                    <td><Calendar size={15} style={{ marginRight: "5px" }} />{course.created_at.slice(0, 10)}</td>
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