import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import SubTasks from "../components/subTasks"
import Course from "../components/course"
const CoursePage = () => {
    const navigate = useNavigate()
    return (
        <div className="course-page">
            <div className="back-btn" onClick={() => navigate("/")}>
                <ArrowLeft />
                <span>Back to Dashboard</span>
            </div>
            <div className="course-page-container">
                <Course />
                <SubTasks />
            </div>
        </div>
    )
}

export default CoursePage