import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className= 'flex flex-row gap-5 text-purple-500 font-bold text-lg align-middle justify-center p-5'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/pastes">All Paste</NavLink>
    </div>
  )
}

export default Navbar