import { Notification } from "@mantine/core"
import { useState } from "react"
import { useAppContext } from "../context/AppContext"
const ErrorNotification = () => {
    const [visible, setVisible] = useState(true)
    const { error, setError } = useAppContext()
    return (
        error.length > 0 && error.map((error, index) => (
            visible && <Notification key={index} className="notification" title={error.message} color="red" icon="" onClose={() => { setVisible(false); setError([]) }}>
            </Notification>
        ))
    )
}

export default ErrorNotification