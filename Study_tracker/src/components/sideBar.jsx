

const SideBar = () => {
    return (
        <div className="side-bar">
            <div className="side-bar-header">
                <h2>Study Tracker</h2>
            </div>
            <div className="side-bar-content">
                <ul>
                    <li>
                        <a href="#">Dashboard</a>
                    </li>
                    <li>
                        <a href="#">History</a>
                    </li>
                    <li>
                        <a href="#">Profile</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar