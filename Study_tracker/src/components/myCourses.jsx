
import { useAppContext } from "../context/AppContext"
import { useState } from "react"
const MyCourses = () => {
    const { courses, getCourseDuration, selectedColor, setSelectedColor, showAddCourseForm, setShowAddCourseForm, insertCourse, user, setRefetch, refetch } = useAppContext()
    const [courseTitle, setCourseTitle] = useState("")
    const [courseDescription, setCourseDescription] = useState("")
    const [courseTargetMinutes, setCourseTargetMinutes] = useState("")
    const handleAddCourse = async (e) => {
        e.preventDefault()
        if (!courseTitle || !courseDescription || !courseTargetMinutes) return
        await insertCourse(courseTitle, courseDescription, selectedColor, courseTargetMinutes, user)
        setShowAddCourseForm(false)
        setCourseTitle("")
        setCourseDescription("")
        setCourseTargetMinutes("")
        setRefetch(!refetch)
    }
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
            {showAddCourseForm && <form action="" onSubmit={handleAddCourse}>
                <label htmlFor="course-title">Course Title</label>
                <input type="text" id="course-title" placeholder="e.g. Mathematics" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                <label htmlFor="course-description">Description</label>
                <input type="text" id="course-description" placeholder="e.g. Algebra" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
                <label htmlFor="course-color">Color</label>
                <div className="colors">
                    {['red', 'green', 'blue', 'yellow', 'purple', 'orange'].map((color) => (
                        <div className={`color square ${selectedColor === color ? "selected" : ""}`} style={{ backgroundColor: color }} onClick={() => setSelectedColor(color)} key={color}></div>
                    ))}
                </div>
                <label htmlFor="course-duration">Target Minutes</label>
                <input type="number" id="course-duration" placeholder="e.g. 120" value={courseTargetMinutes} onChange={(e) => setCourseTargetMinutes(e.target.value)} />
                <div className="buttons">
                    <button className="add-btn" type="submit">Add Course</button>
                    <button className="cancel-btn" onClick={() => setShowAddCourseForm(!showAddCourseForm)} type="submit" >Cancel</button>
                </div>
            </form>}
        </>
    )
}

export default MyCourses