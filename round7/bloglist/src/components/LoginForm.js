import React, { useState } from 'react'
import Notification from './Notification'

const LoginForm = ({ handleLogin }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  return (
    <>
      <h2>login</h2>
      <Notification />
      <form
        id="login-form"
        onSubmit={(e) => handleLogin(e, username, password)}
      >
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="submit" type="submit">
          login
        </button>
      </form>
    </>
  )
}

export default LoginForm
