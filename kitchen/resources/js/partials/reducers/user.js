export const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    case 'ISAUTH':
      var auth = null
      if (localStorage.getItem("access_token")) {
        axios.get('/api/user',{
          headers: {
            Authorization : `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(res => {
          // if (res.status == 200) {
            return  res.data
          // }
          console.log(res);
        })
      }
      return auth
    default: 
      return state
  }
}