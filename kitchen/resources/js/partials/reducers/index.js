import { combineReducers } from "redux"
import {userReducer} from './user'
import { cartReducer } from "./cart"

const allReducers = combineReducers({userReducer, cartReducer})

export default allReducers