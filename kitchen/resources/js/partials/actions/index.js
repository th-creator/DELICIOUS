export const login = (auth) => {
  return (
    {
      type: 'LOGIN',
      payload: auth
    }
  )
}

export const logout = () => {
  return (
    {
      type: 'LOGOUT'
    }
  )
}

export const isAuth = () => {
  return (
    {
      type: 'ISAUTH'
    }
  )
}

