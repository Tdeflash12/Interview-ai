import React from 'react'
import { Link, useNavigate } from 'react-router'
import '../auth.form.scss'


const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
  }
  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit }>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Enter email address' required />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' placeholder='Enter password' required />
          </div>
          <div className='form-actions'>
            <button className='button primary-button full' type='submit'>Login</button>
          </div>
        </form>
        <p>Don't have an account?<a href="/register">Register</a></p>

      </div>
    </main>
  )
}

export default Login