import React from 'react';
import { useUserContext } from '../../../ Constext/context';

const Home: React.FC = () => {
  const user = useUserContext();
  console.log(user)

  return (
    <div>
        <h1>Welcome, {user?.user?.email}</h1>
        <h1>Welcome, Guest!</h1>
      
      {/* Add personalized content here */}
    </div>
  )
}


export default Home