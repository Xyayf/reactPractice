import { handleActions} from 'redux-actions';
import {SET_ROUTES} from '../actionsConfig'
import {publicRoutes} from '../../router/routerConfig'

export const routes=handleActions({
    [SET_ROUTES]:(state,action)=>[...publicRoutes,...action.payload]
},publicRoutes)
//{routes:[[...publicRoutes,...action.payload]]}