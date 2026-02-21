
import { useAppContext } from "../context/AppContext"
const MyCourses = () => {
    const { courses, getCourseDuration, selectedColor, setSelectedColor, showAddCourseForm, setShowAddCourseForm } = useAppContext()
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
            <button className="add-course-btn" onClick={() => setShowAddCourseForm(!showAddCourseForm)}>+ Add New Course</button>
            {showAddCourseForm && <form action="" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="course-title">Course Title</label>
                <input type="text" id="course-title" placeholder="e.g. Mathematics" />
                <label htmlFor="course-description">Description</label>
                <input type="text" id="course-description" placeholder="e.g. Advanced Calculus" />
                <label htmlFor="course-color">Course Color</label>
                <div className="colors">
                    {['red', 'green', 'blue', 'yellow', 'purple', 'orange'].map((color) => (
                        <div className={`color square ${selectedColor === color ? "selected" : ""}`} style={{ backgroundColor: color }} onClick={() => setSelectedColor(color)} key={color}></div>
                    ))}
                </div>
                <div className="buttons">
                    <button className="add-btn" onClick={() => console.log("Add Course")} type="submit">Add Course</button>
                    <button className="cancel-btn" onClick={() => setShowAddCourseForm(!showAddCourseForm)} type="submit" >Cancel</button>
                </div>
            </form>}
        </>
    )
}

export default MyCourses