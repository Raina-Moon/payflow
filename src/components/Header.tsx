import React from 'react'
import { Outlet } from 'react-router-dom'

const Header = () => {
  return (
    <div>Header

        <Outlet />
    </div>
  )
}

export default Header