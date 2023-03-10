import React from 'react'
import { Routes } from "react-router-dom"
import { PublicRouters } from "./Routes/PublicRoutes"
import { AdminRouters } from "./Routes/AdminRoutes"
import { ErrorRouters } from './Routes/ErrorRoutes';

function RouteList() {
  return (
    <>
    <Routes>
        { PublicRouters }        
        { AdminRouters }        
        { ErrorRouters }
    </Routes>
    </>
  )
}

export default RouteList