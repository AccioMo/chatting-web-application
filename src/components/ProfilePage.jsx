import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const ProfilePage = () => {
	// const UID = process.env.REACT_APP_GOOGLE_ID;
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const handleclick = () => setI(i + 1);
  return (
      <>
      
      </>
  )
}

export default ProfilePage;