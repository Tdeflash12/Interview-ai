import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const {navigate} = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {loading,handleRegister}=useAuth()


  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate('/')
  }
if(loading){
  return <main>
    <h1>Loading...</h1>
  </main>
}
  const handleCancel = () => {
    setUsername('')
    setEmail('')
    setPassword('')
  }

  return (
    <main>
      <div className='form-container'>
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor='username'>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' id='username' name='username' placeholder='username' required />
          </div>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' id='email' name='email' placeholder='you@company.com' required />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' id='password' name='password' placeholder='Create a password' required />
          </div>
          <div className='form-actions'>
            <button className='button primary-button full' type='submit'>Register</button>
            <button className='button secondary-button full' type='button' onClick={handleCancel}>Cancel</button>
          </div>
        </form>
        <p>Already have an account? <Link to={'/login'}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register