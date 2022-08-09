export const breadCrumbs=(state=[],action)=>{
    switch (action.type){
        case 'GET_TAB_VIEWS':{
            return [1,2]
        }
        default:
        return state
    }
}