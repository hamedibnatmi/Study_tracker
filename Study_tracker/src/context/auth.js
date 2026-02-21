import supabase from "../SupaBase"


export const login = async (email, password) => {
    const { data, error } = await supabase.from('users').select('*').eq('email', email).eq('password', password)
    if (error) throw error
    return data
}
