import { Square } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import TimerCount from "./timerCount"
const Timer = () => {
    const { setSessionStarted, currentCourse, setCurrentCourse, timer, insertStudySession, studySessions, setRefetch } = useAppContext()

    const handleStop = () => {
        setSessionStarted(false)
        async function insertSession() {
            await insertStudySession(studySessions.length, timer, currentCourse.user_id, currentCourse.id)
            setCurrentCourse(null)
            setRefetch(prev => !prev)
        }
        insertSession()
    }
    return (
        <>
            <div className="timer">
                <div className="left-side">
                    <p>Currently studying</p>
                    <h4>{currentCourse.title}</h4>
                    <TimerCount />
                </div>
                <div className="stop-button" onClick={handleStop}>
                    <Square />
                    <p>Stop</p>
                </div>
            </div>
        </>
    )
}

export default Timer