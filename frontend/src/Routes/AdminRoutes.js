import React from 'react'
import { Route } from "react-router-dom"

const Dashboard = React.lazy(() => import("../pages/Admin/Dashboard"))

export const AdminRoutes =  [
    {
        _uid: "admin-dashboard",
        name: "Dashboard",
        index: true,
        path: "/dashboard",
        component: <Dashboard />,
    },
]

const AdminChildRoutes = AdminRoutes.map((route) => {
    return <Route 
        index={route.index}
        path={`/admin${route.path}`} 
        element={
            <React.Suspense fallback={<>...</>}>
                {route.component}
            </React.Suspense>
        }
        key={route._uid}
    />
})


export const AdminRouters = (
    <Route 
        path="admin" 
        key="admin-home"
        element={ 
            <React.Suspense fallback={<>...</>}>
                <Dashboard />
            </React.Suspense>
        }
    >
        { AdminChildRoutes }
    </Route>
)