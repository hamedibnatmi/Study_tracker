import { useEffect } from "react"
import { useAppContext } from "../context/AppContext"

const TimerCount = () => {
    const { timer, setTimer } = useAppContext()
    useEffect(() => {
        let timer = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1)
        }, 1000)
        return () => {
            clearInterval(timer)
            setTimer(59)
        }
    }, [])

    const hours = Math.floor(timer / 3600)
    const minutes = Math.floor((timer % 3600) / 60)
    const seconds = timer % 60

    const formattedHours = hours.toString().padStart(2, "0")
    const formattedMinutes = minutes.toString().padStart(2, "0")
    const formattedSeconds = seconds.toString().padStart(2, "0")
    return (
        <>
            <div>
                <h3>{formattedHours}:{formattedMinutes}:{formattedSeconds}</h3>
            </div>
        </>
    )
}

export default TimerCount