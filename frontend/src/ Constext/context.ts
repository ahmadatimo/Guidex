import { User } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'

export const DashboardContext = createContext<User | null>(null)


//custom hook instead of using useContext directly
export function useUserContext() {
    const user = useContext(DashboardContext);

    if (user === undefined) {
        throw new Error('useUserContext must be used with a DashboardContext');
    }

    return user;
}
