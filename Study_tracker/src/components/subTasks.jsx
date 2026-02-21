import { useAppContext } from "../context/AppContext"

const SubTasks = () => {
    const { courses, completedTasks, getAllSubTasks } = useAppContext()
    return (<>
        <div className="subtasks">
            <div className="subtasks-title">
                <h2>Tasks Due Today</h2>
                <p>{completedTasks}/{getAllSubTasks(courses).length} done</p>
            </div>
            {courses.map((course) => (
                course.subtasks.map((subtask) => (

                    <div className="subtask-item">
                        <div className={`subtask ${subtask.completed ? "completed" : ""}`} key={subtask.id}>
                            <input type="checkbox" checked={subtask.completed} onChange={() => { }} />
                            <p>{subtask.title}</p>
                        </div>
                        <div className="course" style={{ backgroundColor: course.color }} key={course.id}>
                            <p>{course.title}</p>
                        </div>
                    </div>
                ))
            ))}
        </div>
    </>)
}

export default SubTasks
