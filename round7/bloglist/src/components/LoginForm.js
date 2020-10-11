import React from 'react'
import Notification from './Notification'
import { TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(login(username, password))
  }

  return (
    <>
      <h2>login</h2>
      <Notification />
      <form
        id="login-form"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField name="username" label="username" />
        </div>
        <div>
          <TextField name="password" label="password" type="password" />
        </div>
        <Button variant="contained" color="primary" id="submit" type="submit">
          login
        </Button>
      </form>
    </>
  )
}

export default LoginForm
