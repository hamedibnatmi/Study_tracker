import { NavLink } from "react-router-dom"
import { House, History, User, BookOpen } from "lucide-react"

const SideBar = () => {
    return (
        <div className="side-bar">
            <div className="side-bar-header">
                <h2><BookOpen size={30} color="purple" />Study Tracker</h2>
            </div>
            <div className="side-bar-content">
                <nav className="side-bar-nav">
                    <NavLink className="NavLink" to="/"><House />Home</NavLink>
                    <NavLink className="NavLink" to="/history"><History />History</NavLink>
                    <NavLink className="NavLink" to="/profile"><User />Profile</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default SideBar