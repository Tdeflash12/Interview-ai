import React from 'react'
import { Link, useNavigate } from 'react-router'
import '../auth.form.scss'

const Register = () => {
  const navigate = useNavigate()

  return (
    <main>
      <div className='form-container'>
        <h1>Register</h1>
  
        <form>
          <div className='input-group'>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' name='username' placeholder='username' required />
          </div>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='you@company.com' required />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' placeholder='Create a password' required />
          </div>
          <div className='form-actions'>
            <button className='button primary-button full' type='submit'>Register</button>
            <button className='button secondary-button full' type='button'>Cancel</button>
          </div>
        </form>
        <p>Already have an account?<Link to={'/login'}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register