import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, severity } = useSelector((state) => state.notification)
  const notificationStyle = {
    color: severity === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === '') {
    return null
  }
  return (
    <div id="notification" className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
