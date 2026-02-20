import { Button } from "@mantine/core"
import { Square } from "lucide-react"
const Timer = () => {
    return (
        <>
            <div className="timer">
                <div className="left-side">
                    <p>Currently studying</p>
                    <h4>Mathematics</h4>
                    <h3>00:00:00</h3>
                </div>
                <div className="stop-button">
                    <Square />
                    <p>Stop</p>
                </div>
            </div>
        </>
    )
}

export default Timer