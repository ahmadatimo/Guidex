import React, { useState } from 'react';

const MyProfile: React.FC = () => {

  const [userData , setUserData] = useState({
    name:"Maksat Abrayev",
    image:"public/assets/Maksat_Abrayev.jpg",
    email: "MaksatAbrayev@gmail.com",
    phone: "+90 506 909 38 05",
    address: "Bilkent University 06800 Bilkent, Ankara, Türkiye",
    gender: "Male",
    BirthDate: "02-06-2004",
    
  })

  const [isEdit,setIsEdit] = useState(false);
  return (
    <div className='ml-10 max-w-lg flex flex-col gap-2 text-sm'>
        <img className='w-36  rounded' src={userData.image} alt="" />
        {
          isEdit?
          <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4 " type="text" value={userData.name} 
          onChange={e => setUserData(prev=> ({...prev, name:e.target.value}))} /> :
          <p className='text-3xl font-medium text-neutral-800 mt-4'>{userData.name}</p>
        }
        <hr className='bg-zinc-400 h-[1px] border-none' />
        <div>
          <p className='text-neutral-500 underline mt-3'>User information:</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>Email: </p>
            <p className='text-blue-500'>{userData.email}</p>
            <p className='font_medium'>Phone:</p>
            {
              isEdit?
              <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} 
              onChange={e => setUserData(prev=> ({...prev, phone:e.target.value}))} />:<p className='text-blue-400'>{userData.phone}</p>
            }
            <p className='font_medium'>Address:</p>
            {
              isEdit?
              <input className='bg-gray-50' type="text" value={userData.address} 
              onChange={e => setUserData(oldInfo => ({...oldInfo ,email:e.target.value}))}/>: 
              <p className='bg-gray-50'>{userData.address}</p>
            }            
          </div>
        </div>
        <div>
          <p className='text-neutral-500 underline mt-3'>Basic Information:</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font_medium'>Gender:</p>
            {
              isEdit?
              <select className='max-w-20 bg-gray-100' value={userData.gender} 
                onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option> 
              </select>: <p className='text-gray-400'>{userData.gender}</p> 
            }
            <p className='font_medium'>Birthday:</p>
            {
              isEdit?
              <input type="date" className='max-w-20 bg-gray-100' value={userData.BirthDate} 
              onChange={(e) => setUserData(prev => ({...prev, BirthDate: e.target.value}))} />:
              <p className='text-gray-400'>{userData.BirthDate}</p>
            }
          </div>
        </div>
        <div className='mt-10'>
            {
              isEdit? 
              <button className = 'border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' 
              onClick={() => setIsEdit(false)}>Save Changes</button>:
              <button className = 'border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' 
              onClick={() => setIsEdit(true)}>Edit</button>
            }
        </div>
    </div>
  )
}


export default MyProfile