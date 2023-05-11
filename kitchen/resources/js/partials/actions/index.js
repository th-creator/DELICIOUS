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

export const initCart = () => {
  return (
    {
      type: 'INIT_CART'
    }
  )
}

export const addToCart = (item) => {
  return (
    {
      type: 'ADD_CART',
      payload: item
    }
  )
}

export const deleteFromCart = (id) => {
  return (
    {
      type: 'DELETE_CART',
      payload: id
    }
  )
}
export const modifyCart = (meal) => {
  return (
    {
      type: 'MODIFY_CART',
      payload: meal
    }
  )
}