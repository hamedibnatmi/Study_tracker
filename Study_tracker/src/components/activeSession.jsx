import { useAppContext } from "../context/AppContext"
import { Play } from "lucide-react"
import { Button } from "@mantine/core"
import Timer from "./timer"

const ActiveSession = () => {
    const { courses, setSessionStarted, sessionStarted } = useAppContext()
    return (
        <>
            <div className="active-session">
                <h4>Active Study Session</h4>
                <p>No active session. Start studying a course!</p>
                <div className="course-buttons" onClick={() => setSessionStarted(true)}>
                    {!sessionStarted && courses.map((course) => (
                        <div key={course.id} className="course-button">
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