export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CART':
      return [
        ...state,
        action.payload
      ]
    case 'DELETE_CART':
      const newMeal = state.filter(meal => meal.id !== action.payload)
      return newMeal 
    case 'MODIFY_CART':
      const Meal = state.map(meal => 
        (meal.id === action.payload.id ? {...meal,quantity: Number(meal.quantity+action.payload.quantity)} : meal))
      return Meal
    case 'INIT_CART':
      return []
    default:
      return state
  }
}