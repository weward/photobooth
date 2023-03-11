import React from 'react'
import { Link } from 'react-router-dom'
import RouteList from '../Routes'

function NavBar() {
  return (
    <div>
      <ul class="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/photoboot">Photoboot</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
      </ul>

      <RouteList />
    </div>
  )
}

export default NavBar