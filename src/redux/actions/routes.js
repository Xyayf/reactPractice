import {createAction} from 'redux-actions'
import {SET_ROUTES} from '../actionsConfig'
console.log(SET_ROUTES)
export const setRoutes=createAction(SET_ROUTES)