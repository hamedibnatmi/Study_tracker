import { useAppContext } from "../context/AppContext"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
const SubTasks = () => {
    const params = useParams()
    const { courses, completedTasks, getAllSubTasks, checkSubTask, refetch, setRefetch, user, insertSubTask } = useAppContext()
    console.log("course", courses.find((course) => course.id === params.id))
    const handleCheck = async (subtaskId, completed) => {
        if (completed) {
            await checkSubTask(subtaskId, user, true)
            setRefetch(!refetch)
        } else {
            await checkSubTask(subtaskId, user, false)
            setRefetch(!refetch)
        }
    }
    const [isCoursePage, setIsCoursePage] = useState(window.location.pathname.includes("/course"))
    const [showAddSubTaskForm, setShowAddSubTaskForm] = useState(false)
    const [courseId, setCourseId] = useState(params.id)
    const [subTaskTitle, setSubTaskTitle] = useState("")
    const [subTaskDueDate, setSubTaskDueDate] = useState("")
    const course = courses.find((course) => course.id === params.id)
    const handleAddSubTask = async (e) => {
        e.preventDefault()
        await insertSubTask(subTaskTitle, subTaskDueDate, user, courseId)
        setRefetch(!refetch)
        setShowAddSubTaskForm(false)
    }
    return (<>
        <div className="subtasks">
            <div className="subtasks-title">
                <h2>Tasks Due Today</h2>
                <div className="right-side">
                    {!isCoursePage && <p>{completedTasks}/{getAllSubTasks(courses).length} done</p>}
                    {isCoursePage && <span className="add-subtask" onClick={() => setShowAddSubTaskForm(!showAddSubTaskForm)}><Plus />Add Task</span>}
                </div>
            </div>
            {showAddSubTaskForm && <div className="add-task-form">
                <form action="" onSubmit={handleAddSubTask}>
                    <label htmlFor="task-title">Task Title</label>
                    <input type="text" id="task-title" placeholder="Enter Task Title" value={subTaskTitle} onChange={(e) => setSubTaskTitle(e.target.value)} />
                    <label htmlFor="task-due-date">Task Due Date</label>
                    <input type="date" id="task-due-date" placeholder="Enter Task Due Date" value={subTaskDueDate} onChange={(e) => setSubTaskDueDate(e.target.value)} />
                    <button type="submit">Add Task</button>
                </form>
            </div>
            }
            {!isCoursePage && courses.map((course) => (
                course.subtasks.map((subtask) => (

                    <div className="subtask-item">
                        <div className={`subtask ${subtask.completed ? "completed" : ""}`} key={subtask.id}>
                            <input type="checkbox" checked={subtask.completed} onChange={(e) => handleCheck(subtask.id, e.target.checked)} />
                            <p>{subtask.title}</p>
                        </div>
                        <div className="course" style={{ backgroundColor: course.color }} key={course.id}>
                            <p>{course.title}</p>
                        </div>
                    </div>
                ))
            ))}
            {isCoursePage && course?.subtasks?.length > 0 && course.subtasks.map((subtask) => (
                <div className="subtask-item">
                    <div className={`subtask ${subtask.completed ? "completed" : ""}`} key={subtask.id}>
                        <input type="checkbox" checked={subtask.completed} onChange={(e) => handleCheck(subtask.id, e.target.checked)} />
                        <p>{subtask.title}</p>
                    </div>
                    <div className="course" style={{ backgroundColor: course.color }} key={course.id}>
                        <p>{course.title}</p>
                    </div>
                </div>
            ))}
            {getAllSubTasks(courses).length === 0 && <p>No subtasks found</p>}
        </div>
    </>)
}

export default SubTasks
