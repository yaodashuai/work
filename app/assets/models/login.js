import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import global from "./global";

export default {
    namespace: 'login',

    state: {
        status: undefined,
        error:null,
    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(fakeAccountLogin, payload);
            if ((response || {} ).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                response.status = response.token ? 'ok' : null;
                yield put({
                    type: 'changeLoginStatus',
                    payload: response,
                });
                // Login successfully
                if (response.status === 'ok') {
                    reloadAuthorized();
                    yield put(routerRedux.push('/'));
                }
            }
        },
        *logout(_, { put, select }) {
            try {
                // get location pathname
                const urlParams = new URL(window.location.href);
                const pathname = yield select(state => state.routing.location.pathname);
                // add the parameters in the url
                urlParams.searchParams.set('redirect', pathname);
                window.history.replaceState(null, 'login', urlParams.href);
            } finally {
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: false,
                        currentAuthority: 'guest',
                    },
                });
                reloadAuthorized();
                yield put(routerRedux.push('/user/login'));
            }
        },
    },

    reducers: {
        clearError(state){
            return {
                ...state,
                error:null
            }
        },
        clearAll(){
            return{
                status: undefined,
                error:null,
            }
        },
        saveError(state,{payload}){
            return{
                ...state,
                error:payload
            }
        },
        changeLoginStatus(state, { payload }) {
            if (payload.status) {
                window.localStorage.setItem('auth', JSON.stringify(payload));
                setAuthority('user');
            } else {
                window.localStorage.clear()
            }
            return {
                ...state,
                status: payload.status,
                type: payload.type,
            };
        },
    },
};
