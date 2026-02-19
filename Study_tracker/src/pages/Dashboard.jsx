import StatusCard from "../components/statusCard"
import { useAppContext } from "../context/AppContext"
import { Clock, BookOpen, Trophy } from "lucide-react"


const Dashboard = () => {
    const { totalHoursUntilNow, totalCourses, totalCompletedCourses } = useAppContext()
    return (
        <div className="dashboard">
            <div className="title">
                <h1>Dashboard</h1>
                <h5>Welcome to your Study Tracker! Here's your study progress today.</h5>
            </div>
            <div className="status-cards">
                <StatusCard title="Total Hours" value={totalHoursUntilNow} icon={<Clock color="purple" background="purple" />} />
                <StatusCard title="Total Courses" value={totalCourses} icon={<BookOpen color="blue" background="blue" />} />
                <StatusCard title="Total Completed Courses" value={totalCompletedCourses} icon={<Trophy color="green" background="green" />} />
            </div>
        </div>
    )
}

export default Dashboard