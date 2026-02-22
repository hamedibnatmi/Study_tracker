import supabase from "../SupaBase"


export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) {
        console.log("Error logging in:", error.message)
        return null
    } else {
        console.log("User logged in successfully:", data)
        return data
    }
}

export const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.log("Error logging out:", error.message)
    } else {
        console.log("User logged out successfully")
    }
}
