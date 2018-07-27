import { fetchList, fetchUniversityInfo, removeUniversityRank, fetchArea, fetchDepartmentList, editUniversityInfo, fetchRank, addRank, updatedRank } from '../services/api';
import {message} from 'antd'
import { routerRedux } from 'dva/router';

export default {
    namespace: 'universityInfo',

    state: {
        data:{},
        error:null,
        country:[],
        area:[],
        universityData:{},
        department:[],
        hide:true
    },

    effects: {
        *clear(_,{call,put}){
            yield put({
                type:'clearData'
            })
        },
        *addRank({payload},{put,call}){
            const response = yield call (addRank,payload)
            if (( response || {} ).error ){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
                yield put({
                    type:'modalShow',
                    payload:true
                })
            }else{
                yield put({
                    type:'fetchRank',
                    payload:{
                        universityId:payload.universityId,
                        page:0,
                        size:10
                    }
                })
                yield put({
                    type:'modalShow',
                    payload:false
                })
            }
        },
        *updatedRank({payload},{put,call}){
            const response = yield call (updatedRank,payload)
            if (( response || {} ).error ){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
                yield put({
                    type:'modalShow',
                    payload:true
                })
            }else{
                yield put({
                    type:'fetchRank',
                    payload:{
                        universityId:payload.universityId,
                        page:0,
                        size:10
                    }
                })
                yield put({
                    type:'modalShow',
                    payload:false
                })
            }
        },
        *editUniversityInfo({payload},{call,put}){
            const response = yield call(editUniversityInfo,payload)
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put(routerRedux.push('/university/universityList'))
            }
        },
        *fetchRank({payload},{call,put}){
            const response = yield call(fetchRank,payload)
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type:'save',
                    payload:response
                })
            }
        },
        *fetchDepartment({payload},{call,put}){
            const response = yield call(fetchDepartmentList,payload)
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
        *fetchUniversityInfo({payload},{call,put}){
            const response = yield call(fetchUniversityInfo,payload)
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type:'saveUniversityInfo',
                    payload:response
                })
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
        *removeItem({ payload }, { call,put }) {
            const response =  yield call(removeUniversityRank, payload);
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                message.success('删除成功!')
                yield put({
                    type: 'fetchRank',
                    payload: {
                        universityId:payload.universityId,
                        page:0,
                        size:10
                    },
                });
            }
        },
    },

    reducers: {
        modalShow(state,{payload}){
            return{
                hide:payload
            }
        },
        saveError(state,{payload}){
            return{
                ...state,
                error:payload
            }
        },
        clearError(state){
            return {
                ...state,
                error:null
            }
        },
        clearData(){
            return{
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
        saveUniversityInfo(state,{payload}){
            return{
                ...state,
                universityData:payload
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
                hide:true,
                data:{
                    list:payload.data,
                    pagination:{
                        total:payload.totalYear,
                        size:10,
                        // current:payload.totalPages
                    }
                }
            }
        },
    },
};
