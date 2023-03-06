import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar/NavBar'
import Container from '@mui/material/Container';

const Layout = () => {
  return (
    <>
        <NavBar/>
        <Outlet/>
    </>
  )
}

export default Layout