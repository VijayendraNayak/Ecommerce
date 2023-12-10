import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

const Adminroute = () => {
    const {currentUser}=useSelector((state)=>state.user)
    const role=currentUser.role;
  return (
    (role===user)?<Outlet/>:<Navigate/>
    
  )
}

export default Adminroute