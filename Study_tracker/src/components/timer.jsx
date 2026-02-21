import { Square } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import TimerCount from "./timerCount"
const Timer = () => {
    const { setSessionStarted, currentCourse, setCurrentCourse, timer, insertStudySession, studySessions, setRefetch, setLoading } = useAppContext()

    const handleStop = () => {
        setSessionStarted(false)
        async function insertSession() {
            setCurrentCourse(null)
            if (timer < 60) return
            setLoading(true)
            try {
                await insertStudySession(studySessions.length, timer, currentCourse.user_id, currentCourse.id)
                setRefetch(prev => !prev)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }

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