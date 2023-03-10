import React from 'react'
import { Route } from "react-router-dom"

const Home = React.lazy(() => import("../pages/Public/Home"))
const Photoboot = React.lazy(() => import("../pages/Public/Photoboot"))
const About = React.lazy(() => import("../pages/Public/About"))

export const PublicRoutes =  [
    {
        _uid: "public-home",
        name: "Home",
        index: true,
        path: "/",
        component: <Home/>,
    },
    {
        _uid: "public-photoboot",
        name: "Photoboot",
        path: "/photoboot",
        component: <Photoboot/>,
    },
    {
        _uid: "public-about",
        name: "About",
        path: "about",
        component: <About />
    },
]

export const PublicRouters = PublicRoutes.map((route) => {
    return <Route 
        index={route.index}
        path={route.path} 
        element={
            <React.Suspense fallback={<>...</>}>
                {route.component}
            </React.Suspense>
        }
        key={route._uid}>    
    </Route>
})
