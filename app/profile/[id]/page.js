"use client"
import React from 'react'
import UserProfile from '../../../components/UserProfile'



const ClickedProfile = ({ params }) => {
    const { id } = React.use(params);
    
  return (
    <UserProfile id={id} />
  )
}

export default ClickedProfile