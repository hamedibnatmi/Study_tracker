import { useState } from "react"

const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Log In</h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => console.log(email, password)}>Log In</button>
            </div>
        </div>
    )
}

export default LogIn