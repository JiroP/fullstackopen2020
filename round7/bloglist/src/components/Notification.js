import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const { message, severity } = useSelector((state) => state.notification)

  if (message === '') {
    return null
  }
  return <Alert severity={severity}>{message}</Alert>
}

export default Notification
