import * as actions from './actiontypes'

let id=0;

const reducer=(state=[],action)=>{
    switch(action.type){
        case actions.ADD_TODO:
            return [
                ...state,
                {
                    id:++id,
                    agenda:action.payload.agenda,
                }
            ];
        case actions.REMOVE_TODO:
            return state.filter((e)=>e.id !== action.payload.id)

        case actions.UPDATE_TODO:
            return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, agenda:action.payload.agenda})
        default:
            return state
    }

}

export default reducer