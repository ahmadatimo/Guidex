//import { createClient } from "@supabase/supabase-js"
import React, { useContext } from 'react';
/* import { UserContext } from '../../../UserContext';

const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsa3JzZWJvcGRrZGtreHBva2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMDMzMDIsImV4cCI6MjA0NDY3OTMwMn0.ggwrcVZrqW4OHGC3t8i7xrP1--9gBeRfFZbbx2L3WI4"
const SUPABASE_URL="https://wlkrsebopdkdkkxpokao.supabase.co"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const deleteUser = async (event: React.FormEvent) =>{
  
  const { data: { user } } = await supabase.auth.getUser();
  const user_id = user?.id
  console.log({user_id})
  console.log(user)
  const body = JSON.stringify(user_id)
  const endpoint = "http://localhost:8000/delete-user"
  const res = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
} */
const Home: React.FC = () => {
  //const { user } = useContext(UserContext);

  return (
    <div>
      
        <h1>Welcome, </h1>
        <h1>Welcome, Guest!</h1>
      
      {/* Add personalized content here */}
    </div>
  )
}

export default Home
