import React from 'react'
import { Route } from "react-router-dom"

const Error404 = React.lazy(() => import("../pages/Error/Error404"))


export const ErrorRoutes =  [
    {
        _uid: "error-404",
        name: "404 Not Found",
        path: "*",
        component: "Error404",
    },
]

export const ErrorRouters = ErrorRoutes.map((route) => {
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