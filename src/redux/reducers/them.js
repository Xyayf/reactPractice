import {handleActions} from 'redux-actions'
import { SET_THEM } from '../actionsConfig'
import { getItem,setItem } from '../../utill/localStorage'
const THEM='them'
export const them= handleActions({
    [SET_THEM]:(state,action)=>{
        
        if(state!==action.payload) {
            setItem(THEM,action.payload)
            console.log(state,'themsate')
        }
        
        return action.payload
    }
},getItem(THEM) || 'white')