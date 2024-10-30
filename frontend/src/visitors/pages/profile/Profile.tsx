import React from 'react';
import { useUserContext } from '../../../ Constext/context';

const Profile: React.FC = () => {
  const user = useUserContext();

  return (
    <div>
        <h1>Profile of, {user?.user?.email}</h1>      
    </div>
  )
}


export default Profile