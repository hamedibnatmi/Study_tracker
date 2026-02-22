import ActiveSession from "../components/activeSession"
import StatusCard from "../components/statusCard"
import { useAppContext } from "../context/AppContext"
import { Clock, BookOpen, Trophy } from "lucide-react"
import { Loader as LoaderMantine } from "@mantine/core"
import MyCourses from "../components/myCourses"
import SubTasks from "../components/subTasks"
const Dashboard = () => {
    const { totalHoursUntilNow, totalCourses, completedTasks, loading } = useAppContext()
    return (
        <div className="dashboard">
            <div className="title">
                <h1>Home</h1>
                <h5>Welcome to your Study Tracker! Here's your study progress today.</h5>
            </div>
            {loading && <div className="loader"><LoaderMantine size={"xl"} color="purple" /></div>}
            <div className="status-cards">
                <StatusCard title="Today's Study Time" value={totalHoursUntilNow} icon={<Clock color="purple" background="purple" />} time="min" />
                <StatusCard title="Courses" value={totalCourses} icon={<BookOpen color="blue" background="blue" />} />
                <StatusCard title="Tasks Due Today" value={completedTasks} icon={<Trophy color="green" background="green" />} />
            </div>
            <div className="active-session-container">
                <ActiveSession />
            </div>
            <div className="my-courses-container">
                <MyCourses />
            </div>
            <div className="subtasks-container">
                <SubTasks />
            </div>
        </div>
    )
}

export default Dashboard