import { useAppContext } from "../context/AppContext"
import { Play } from "lucide-react"
import { Button } from "@mantine/core"
import Timer from "./timer"

const ActiveSession = () => {
    const { courses } = useAppContext()
    return (
        <>
            <div className="active-session">
                <h4>Active Study Session</h4>
                <p>No active session. Start studying a course!</p>
                <div className="course-buttons">
                    {false && courses.map((course) => (
                        <div key={course.id} className="course-button">
                            <Play size={20} />
                            <p title={course.title}>{course.title}</p>
                        </div>
                    ))}
                    {true && <Timer />}
                </div>
            </div>
        </>
    )
}



export default ActiveSession;