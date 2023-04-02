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

export const setFavorite = (favourite) => {
  return (
    {
      type: 'SAVE',
      payload: favourite
    }
  )
}

export const unsetFavorite = (favourite) => {
  return (
    {
      type: 'DELETE',
      payload: favourite
    }
  )
}

export const initFavorite = (favourite) => {
  return (
    {
      type: 'INIT',
      payload: favourite
    }
  )
}