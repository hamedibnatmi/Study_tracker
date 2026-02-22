import { SquareX } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import { useParams } from "react-router-dom"
import { Loader as LoaderMantine } from "@mantine/core"
const Course = () => {
    const { courses, deleteCourse, user, setRefetch, refetch, setLoading, loading } = useAppContext()
    const { id } = useParams()
    const course = courses.find((course) => course.id === id)
    const handleDeleteCourse = async (courseId) => {
        setLoading(true)
        try {
            await deleteCourse(courseId, user)
            setRefetch(!refetch)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div className="course-page-container">
            {loading && <div className="loader"><LoaderMantine size={"xl"} color="purple" /></div>}
            {course &&
                <div className="course-page-header">
                    <div className={`circle`} style={{ backgroundColor: course.color }}></div>
                    <div className="course-page-header-content">
                        <h1>{course.title}</h1>
                        <p>{course.description}</p>
                        <p>Target: {course.target_minutes} min</p>
                    </div>
                    <div className="course-page-header-actions" style={{ marginLeft: "auto", cursor: "pointer" }}>
                        <SquareX className="squareX" size={20} onClick={() => handleDeleteCourse(course.id)} />
                    </div>
                </div>}
            {!course && !loading && <div className="loading">The Course has been deleted or not found!</div>}
        </div>
    )
}

export default Course