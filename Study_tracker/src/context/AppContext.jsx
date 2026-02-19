import { createContext, useContext, useState } from "react"
const AppContext = createContext()


const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    var value = {
        user,
        setUser
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider")
    }
    return context
}

export { AppContextProvider, useAppContext }
