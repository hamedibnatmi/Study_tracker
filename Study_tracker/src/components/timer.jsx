import { Square } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import TimerCount from "./timerCount"
const Timer = () => {
    const { setSessionStarted, currentCourse } = useAppContext()
    return (
        <>
            <div className="timer">
                <div className="left-side">
                    <p>Currently studying</p>
                    <h4>{currentCourse?.name}</h4>
                    <TimerCount />
                </div>
                <div className="stop-button" onClick={() => setSessionStarted(false)}>
                    <Square />
                    <p>Stop</p>
                </div>
            </div>
        </>
    )
}

export default Timer