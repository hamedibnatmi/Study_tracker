import { NavLink } from "react-router-dom"

const SideBar = () => {
    return (
        <div className="side-bar">
            <div className="side-bar-header">
                <h2>Study Tracker</h2>
            </div>
            <div className="side-bar-content">
                <nav className="side-bar-nav">
                    <NavLink className="NavLink" to="/">Dashboard</NavLink>
                    <NavLink className="NavLink" to="/history">History</NavLink>
                    <NavLink className="NavLink" to="/profile">Profile</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default SideBar