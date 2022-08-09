import { combineReducers } from 'redux';
import * as app from './app'
import * as routes from './routes'
import * as user from './user'
import * as them from './them'
export default combineReducers(
   {
   ...app,
   ...routes,
   ...user,
   ...them
   }
)
