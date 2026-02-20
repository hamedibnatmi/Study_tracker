
export function getCompletedTasks(data) {
    let counter = 0;
    data.forEach(element => {
        let completedSubTasks = element.subtasks.filter(sub => {
            return sub.completed
        })

        counter += completedSubTasks.length
    });

    return counter
}
