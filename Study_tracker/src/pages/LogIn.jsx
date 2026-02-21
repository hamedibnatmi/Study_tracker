import { useAuth } from "../context/AuthContext"
import { useAppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

const LogIn = () => {
    const { email, setEmail, password, setPassword, login, error, setError } = useAuth()
    const { setUser, user } = useAppContext()
    const navigate = useNavigate()
    const handleLogin = async () => {
        const data = await login(email, password)
        setUser(data[0].id)
        if (user) navigate("/")
        else setError(error)
    }
    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Log In</h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Log In</button>
            </div>
        </div>
    )
}

export default LogIn