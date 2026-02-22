
import { useAppContext } from "../context/AppContext"
import { useParams } from "react-router-dom"
const Course = () => {
    const { courses } = useAppContext()
    const { id } = useParams()
    const course = courses.find((course) => course.id === id)
    return (
        <div className="course-page-container">
            <div className="course-page-header">
                <div className={`circle`} style={{ backgroundColor: course.color }}></div>
                <div className="course-page-header-content">
                    <h1>{course.title}</h1>
                    <p>{course.description}</p>
                    <p>Target: {course.target_minutes} min</p>
                </div>
            </div>
        </div>
    )
}

export default Course