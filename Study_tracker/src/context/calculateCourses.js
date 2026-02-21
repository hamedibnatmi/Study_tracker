import supabase from "../SupaBase"
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

export function getTodaysStudyime(data) {
    let totalTime = 0;
    const date = new Date().toISOString().slice(0, 10);
    data.forEach(element => {
        element.study_sessions.forEach(ss => {
            if (date == ss.date) totalTime += ss.duration
        })
    });

    return totalTime;
}

export async function insertStudySession(lastSessionId, duration, userId, courseId) {

    const { data, error } = await supabase
        .from('study_sessions')
        .insert([
            {
                id: `session-${(lastSessionId + 1).toString().padStart(3, '0')}`,
                user_id: userId,
                course_id: courseId,
                duration: Math.floor(duration / 60),
                date: new Date().toISOString().slice(0, 10)
            }
        ])

    if (error) {
        console.error("Error inserting study session:", error)
    } else {
        console.log("Study session inserted:", data)
    }
}

export async function getSessions(userId) {
    const { data, error } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error("Error fetching study sessions:", error)
    } else {
        console.log("Fetched study sessions:", data)
        return data;
    }
}

export function getCourseDuration(studySessions) {
    let totalTime = 0;
    studySessions.forEach(element => {
        totalTime += element.duration
    });
    return totalTime;
}

export async function insertCourse(title, description, color, targetMinutes, userId) {
    const { data, error } = await supabase
        .from('courses')
        .insert([
            {
                id: `course-${crypto.randomUUID()}`,
                user_id: userId,
                title: title,
                description: description,
                color: color,
                target_minutes: targetMinutes
            }
        ])

    if (error) {
        console.error("Error inserting course:", error)
    } else {
        console.log("Course inserted:", data)
    }
}

