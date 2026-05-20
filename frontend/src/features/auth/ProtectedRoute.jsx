import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './auth.context.jsx'

export default function ProtectedRoute({ children }){
  const { user, loading } = useContext(AuthContext)
  if (loading) return <main><h1>Loading...</h1></main>
  if (!user) return <Navigate to="/login" />
  return children
}
