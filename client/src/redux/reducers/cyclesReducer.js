const initialData = {
    cycles : [],

};

export const cyclesReducer = (state=initialData , action)=>{

     switch(action.type)
     {
         case 'GET_ALL_CYCLES' : {
             return{
                 ...state,
                 cycles : action.payload
             }
         }
         
         default:return state
     }

}

