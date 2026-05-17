import React from 'react'
import { useAuth } from './features/auth/hooks/useAuth'

export default function Home(){
  const { user } = useAuth()
  return (
    <main style={{padding:20}}>
      <h1>Welcome{user?.username ? `, ${user.username}` : ''}!</h1>
      <p>This is the home page at <strong>/</strong>.</p>
    </main>
  )
}
