let data = [
    {
        "id": "course-001",
        "user_id": "user-001",
        "title": "Advanced Mathematics",
        "description": "Calculus, Linear Algebra, and Differential Equations",
        "color": "#9575cd",
        "target_minutes": 180,
        "created_at": "2026-02-19T13:38:30.423057",
        "study_sessions": [
            {
                "date": "2024-02-14",
                "duration": 65
            },
            {
                "date": "2024-02-15",
                "duration": 90
            }
        ],
        "subtasks": [
            {
                "id": "subtask-001",
                "title": "Complete Chapter 5: Integration Techniques",
                "completed": true
            },
            {
                "id": "subtask-002",
                "title": "Practice problem set 6.1-6.3",
                "completed": false
            },
            {
                "id": "subtask-003",
                "title": "Review for midterm exam",
                "completed": false
            }
        ]
    },
    {
        "id": "course-002",
        "user_id": "user-001",
        "title": "Data Structures",
        "description": "Arrays, Trees, Graphs, and Algorithm Analysis",
        "color": "#90caf9",
        "target_minutes": 150,
        "created_at": "2026-02-19T13:38:30.423057",
        "study_sessions": [
            {
                "date": "2024-02-14",
                "duration": 75
            },
            {
                "date": "2024-02-16",
                "duration": 50
            }
        ],
        "subtasks": [
            {
                "id": "subtask-004",
                "title": "Implement Binary Search Tree",
                "completed": true
            },
            {
                "id": "subtask-005",
                "title": "Study Graph Algorithms",
                "completed": false
            }
        ]
    },
    {
        "id": "course-003",
        "user_id": "user-001",
        "title": "Physics II",
        "description": "Electricity, Magnetism, and Optics",
        "color": "#80cbc4",
        "target_minutes": 120,
        "created_at": "2026-02-19T13:38:30.423057",
        "study_sessions": [
            {
                "date": "2024-02-15",
                "duration": 45
            }
        ],
        "subtasks": [
            {
                "id": "subtask-006",
                "title": "Lab report: Electromagnetic Induction",
                "completed": false
            }
        ]
    },
    {
        "id": "course-004",
        "user_id": "user-001",
        "title": "Web Development",
        "description": "React, TypeScript, and Modern Frontend",
        "color": "#b39ddb",
        "target_minutes": 200,
        "created_at": "2026-02-19T13:38:30.423057",
        "study_sessions": [
            {
                "date": "2024-02-13",
                "duration": 120
            },
            {
                "date": "2024-02-16",
                "duration": 80
            }
        ],
        "subtasks": [
            {
                "id": "subtask-007",
                "title": "Build Todo App with React Hooks",
                "completed": true
            },
            {
                "id": "subtask-008",
                "title": "Learn TypeScript Generics",
                "completed": false
            }
        ]
    },
    {
        "id": "course-005",
        "user_id": "user-001",
        "title": "English Literature",
        "description": "Shakespeare, Poetry, and Critical Analysis",
        "color": "#f8bbd0",
        "target_minutes": 90,
        "created_at": "2026-02-19T13:38:30.423057",
        "study_sessions": [
            {
                "date": "2024-02-17",
                "duration": 60
            }
        ],
        "subtasks": [
            {
                "id": "subtask-009",
                "title": "Read Hamlet Act 1-3",
                "completed": true
            }
        ]
    }
]
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
    // const date = new Date().toISOString().slice(0, 10);
    const date = "2024-02-16" // mock date for now for testing
    data.forEach(element => {
        element.study_sessions.forEach(ss => {
            if (date == ss.date) totalTime += ss.duration
        })
    });

    return totalTime;
}

console.log(getTodaysStudyime(data))
