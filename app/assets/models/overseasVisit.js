
import { routerRedux } from 'dva/router';
import { fetchAccessList } from "../services/api";


export default {
    namespace: 'overseasVisit',

    state: {

    },

    effects: {

    },

    reducers: {
        clearError(state){
            return{
                ...state,
                error:null
            }
        },
        clear(state){
            return{

            }
        },
        saveError(state,{payload}){
            return{
                ...state,
                error:payload
            }
        },
    },
};
