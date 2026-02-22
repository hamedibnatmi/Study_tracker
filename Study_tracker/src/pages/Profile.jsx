import { User, Mail } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import { useEffect, useState } from "react"
import { Loader as LoaderMantine } from "@mantine/core"
const Profile = () => {
    const { logout, user } = useAuth()
    const { getProfile, courses, studySessions, loading, setLoading } = useAppContext()
    const [profileData, setProfileData] = useState(null)
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout()
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setLoading(true)
        const profile = async () => {
            try {
                const data = await getProfile(user)
                console.log("Profile Data: ", data)
                setProfileData({
                    full_name: data[0].full_name,
                    email: data[0].email,
                    courses_count: courses.length,
                    sessions_count: studySessions.length,
                    total_study_time: studySessions.reduce((acc, session) => acc + session.duration, 0)
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        profile()
    }, [])
    return (
        <div className="profile-container">
            <h1>Profile</h1>
            {loading && <div className="profile-loader"><LoaderMantine size={"xl"} color="purple" /></div>}
            {!loading && <div className="profile-box">
                <div className="profile-info">
                    <div className="profile-avatar">
                        <User size={100} />
                    </div>
                    <div className="profile-details">
                        <p>{profileData?.full_name}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Mail size={20} />
                            <p>{profileData?.email}</p>
                        </div>
                    </div>
                </div>
                <div className="profile-stats">
                    <div className="courses-count">
                        <p>Courses</p>
                        <p>{profileData?.courses_count}</p>
                    </div>
                    <div className="sessions-count">
                        <p>Sessions</p>
                        <p>{profileData?.sessions_count}</p>
                    </div>
                    <div className="total-study-time">
                        <p>Total Study Time</p>
                        <p>{profileData?.total_study_time}</p>
                    </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </div>}
        </div>
    )
}

export default Profile