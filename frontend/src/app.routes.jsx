import { createBrowserRouter } from "react-router-dom"
import Login from "./features/auth/pages/Login.jsx"
import Register from "./features/auth/pages/Register.jsx"
import ProtectedRoute from "./features/auth/ProtectedRoute.jsx"
export const router = createBrowserRouter([
  
    {
        path: "/",  
        element: (
            <ProtectedRoute>
               <h1>home page</h1> 
            </ProtectedRoute>
        ),

       
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
])
 
