import { handleActions} from 'redux-actions';
import {SET_USER,DELETE_USER} from '../actionsConfig'
export const user =handleActions({
    [SET_USER] :(state,action)=>action.payload,
    [DELETE_USER]:()=> null
},{})


//{user:{action.payload}}