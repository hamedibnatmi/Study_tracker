
import { useAppContext } from "../context/AppContext"

const MyCourses = () => {
    const { courses, getCourseDuration } = useAppContext()
    return (
        <>
            <h2>My Courses</h2>
            {courses.map((course) => (
                <div className="course-card" key={course.id}>
                    <div className="left-side">
                        <div className="circle" style={{ backgroundColor: course.color }}></div>
                        <div className="course-info">
                            <span>{course.title}</span>
                            <p>{course.description}</p>
                        </div>
                    </div>
                    <div className="right-side">
                        <p className="duration">{getCourseDuration(course.study_sessions)} min</p>
                        <p className="total">total</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MyCourses