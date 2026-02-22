import { useAppContext } from "../context/AppContext"
import { Plus } from "lucide-react"
import { useState } from "react"
const SubTasks = () => {
    const { courses, completedTasks, getAllSubTasks, checkSubTask, refetch, setRefetch, user } = useAppContext()
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
                <form action="">
                    <label htmlFor="task-title">Task Title</label>
                    <input type="text" id="task-title" placeholder="Enter Task Title" />
                    <label htmlFor="task-due-date">Task Due Date</label>
                    <input type="date" id="task-due-date" placeholder="Enter Task Due Date" />
                    <button type="submit">Add Task</button>
                </form>
            </div>
            }
            {courses.map((course) => (
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
        </div>
    </>)
}

export default SubTasks
