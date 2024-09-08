import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import AuthContext from '../contexts/AuthContext'

const PrivateRoute = () => {
  const { checkToken } = useContext(AuthContext)
  const { user } = checkToken()

  if (!user) {
    return (<Navigate to="/login" />)
  }

  return (<Outlet />)
}

export default PrivateRoute
