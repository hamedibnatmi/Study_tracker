import { useAppContext } from "../context/AppContext"
import { Play } from "lucide-react"
import Timer from "./timer"

const ActiveSession = () => {
    const { courses, setSessionStarted, sessionStarted, setCurrentCourse } = useAppContext()
    return (
        <>
            <div className="active-session">
                <h4>Active Study Session</h4>
                <p>No active session. Start studying a course!</p>
                <div className="course-buttons">
                    {!sessionStarted && courses.map((course) => (
                        <div key={course.id} className="course-button" onClick={() => { setCurrentCourse(course); setSessionStarted(true) }}>
                            <Play size={20} />
                            <p title={course.title}>{course.title}</p>
                        </div>
                    ))}
                </div>
                {sessionStarted && <Timer />}
            </div>
        </>
    )
}



export default ActiveSession;