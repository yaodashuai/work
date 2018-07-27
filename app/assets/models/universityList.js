import {fetchArea, fetchUniversityList, fetchList, removeUniversityItem, fetchDepartment, createUniversity } from '../services/api';
import {message} from 'antd'

export default {
    namespace: 'universityList',

    state: {
        country:[],
        data:{},
        error:null,
        area:[],
        department:[],
        closed:false,
    },

    effects: {
        *clear(_,{call,put}){
            yield put({
                type:'clearData'
            })
        },
        *fetchUniversityList({ payload }, { call, put }) {
            const response = yield call(fetchUniversityList, payload);
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type: 'save',
                    payload: response,
                });
            }
        },
        *fetchCountry({payload},{call,put}){
            const response = yield call(fetchList,payload)
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type:'saveCountry',
                    payload:response
                })
            }
        },
        *fetchArea({payload},{call,put}){
            const response = yield call(fetchArea,payload)
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type:'saveArea',
                    payload:response
                })
            }
        },
        *fetchDepartment({payload},{call,put}){
            const response = yield call(fetchDepartment)
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type:'saveDepartment',
                    payload:response
                })
            }
        },
        *createUniversity({payload},{call,put}){
            const response = yield call (createUniversity,payload)
            if ((response || {}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            } else{
                yield put({
                    type: 'fetchUniversityList',
                    payload: {
                        page:0,
                        size:10
                    },
                });
                yield put({
                    type:'closed'
                })
            }
        },
        *removeItem({ payload }, { call,put }) {
            const response =  yield call(removeUniversityItem, payload);
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                message.success('删除成功!')
                yield put({
                    type: 'fetchUniversityList',
                    payload: {
                        page:0,
                        size:10
                    },
                });
            }
        },
    },

    reducers: {
        closed(state){
            return {
                ...state,
                closed:true
            }
        },
        saveError(state,{payload}){
            return{
                ...state,
                error:payload
            }
        },
        clearData(){
            return{
                category:[],
                data:{},
                error:null
            }
        },
        saveCountry(state,{payload}){
            return{
                ...state,
                country:payload.data
            }
        },
        saveArea(state,{payload}){
            return{
                ...state,
                area:payload.data
            }
        },
        saveDepartment(state,{payload}){
            return{
                ...state,
                department:payload.data
            }
        },
        save(state, {payload}) {
            return {
                ...state,
                closed:false,
                data:{
                    list:payload.data,
                    pagination:{
                        total:payload.totalElements,
                        size:10,
                        // current:payload.totalPages
                    }
                }
            }
        },
    },
};
