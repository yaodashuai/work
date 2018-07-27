import { fakeRegister } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
    namespace: 'register',

    state: {
        status: undefined,
        auth: undefined,
        error:null
    },

    effects: {
        *submit({ payload }, { call, put }) {
            const response = yield call(fakeRegister, payload);
            if((response||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type: 'registerHandle',
                    payload: response,
                });
            }
        },
    },

    reducers: {
        saveError(state,{payload}){
            return{
                ...state,
                error:payload
            }
        },
        clearError(state){
            return{
                ...state,
                error:null
            }
        },
        clearAll(){
            return{
                status: undefined,
                auth: undefined,
                error:null
            }
        },
        registerHandle(state, { payload }) {
            // setAuthority(payload.token);
            setAuthority('user');
            reloadAuthorized();
            return {
                ...state,
                // status: payload.status,
                auth: payload,
            };
        },
    },
};
