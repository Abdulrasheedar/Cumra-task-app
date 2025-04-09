import React from 'react'

const PrivateRoute = ({children}) => {
    const {token} = useAuth();
  return token ? children:<Navigate to="/login" />
}

export default PrivateRoute
