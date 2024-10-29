import { DashboardContext } from "../../ Constext/context"
import React, { useState } from 'react';
import VisitorAuthPage from "./auth/VisitorAuthPage";
import VisitorHomePage from './home/Home';
import { User } from '@supabase/supabase-js';
import VisitorLayout from "../../layouts/VisitorLayout";

const Visitor: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <DashboardContext.Provider value={user}>
            {user ? (
                <VisitorLayout>
                    <VisitorHomePage />
                </VisitorLayout>
            ) : (
                <VisitorAuthPage setUser={setUser} />
            )}
        </DashboardContext.Provider>
    )
}

export default Visitor