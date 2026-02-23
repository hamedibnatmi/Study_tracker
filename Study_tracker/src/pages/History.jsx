import { Trash2 } from "lucide-react"
const History = () => {
    return (
        <div>
            <h1 className="history-page-title">Study History</h1>
            <div className="history-page-container">
                <div className="total-time-box">
                    <p>Total Study Time</p>
                    <p>0</p>
                </div>
                <div className="history-list">
                    <p>History</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Math</td>
                                <td>1 hour</td>
                                <td>2022-01-01</td>
                                <td><button className="delete-action"><Trash2 /></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default History