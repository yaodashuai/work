import { routerRedux } from 'dva/router';
import { fetchAccessList, fetchPermissionGroup, allocationPermissions, deletePermissions, addRole, updateRole, deleteRole } from "../services/api";


export default {
    namespace: 'accountList',

    state: {
        data:[],
        permissionGroup:[],
        hide:true,
        savePermissions:{},
        deletePermissions:{},
        error:null
    },

    effects: {
        *deleteRole({payload},{call,put}){
            const response = yield call(deleteRole,payload)
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type:'saveDeleteRole',
                    payload:response
                })
                yield put({
                    type:'fetchList',
                    payload:{
                        page:0,
                        size:300
                    }
                })
            }
        },
        *addRole({payload},{call,put}){
            const response = yield call(addRole,payload)
            if((response ||{}).error){
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
                    type:'modalShow',
                    payload:false
                })
                yield put({
                    type:'fetchList',
                    payload:{
                        page:0,
                        size:300
                    }
                })
            }
        },
        *updateRole({payload},{call,put}){
            const response = yield call(updateRole,payload)
            if((response ||{}).error){
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
                    type:'modalShow',
                    payload:false
                })
                yield put({
                    type:'fetchList',
                    payload:{
                        page:0,
                        size:300
                    }
                })
            }
        },
        *deletePermissions({payload},{call,put}){
            const response = yield call(deletePermissions,payload)
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type:'saveDeletePermissions',
                    payload:response
                })
            }
        },
        *allocationPermissions({payload},{call,put}){
            const response = yield call(allocationPermissions,payload)
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type:'savePermissions',
                    payload:response
                })
            }
        },
        *fetchList({payload},{call,put}){
            const response = yield call(fetchAccessList,payload)
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type:'saveAccessList',
                    payload:response
                })
            }
        },
        *fetchPermissionGroup({payload},{call,put}){
            const response = yield call(fetchPermissionGroup,payload)
            if((response ||{}).error){
                yield put({
                    type:'saveError',
                    payload:response.error
                })
            }else{
                yield put({
                    type:'savePermissionGroup',
                    payload:response
                })
            }
        },
    },

    reducers: {
        clearSavePermissions(state){
            return{
                ...state,
                savePermissions:{}
            }
        },
        clearDeletePermissions(state){
            return{
                ...state,
                deletePermissions:{}
            }
        },
        clearError(state){
            return{
                ...state,
                error:null
            }
        },
        clear(state){
            return{
                data:[],
                permissionGroup:[],
                hide:true,
                savePermissions:{},
                deletePermissions:{},
                error:null
            }
        },
        saveError(state,{payload}){
            return{
                ...state,
                error:payload
            }
        },
        modalShow(state,{payload}){
            return{
                ...state,
                hide:payload
            }
        },
        saveAccessList(state,{payload}){
            return{
                ...state,
                hide:true,
                data:payload.data
            }
        },
        savePermissionGroup(state,{payload}){
            return{
                ...state,
                permissionGroup:payload.data
            }
        },
        savePermissions(state,{payload}){
            return{
                ...state,
                savePermissions:payload
            }
        },
        saveDeletePermissions(state,{payload}){
            return{
                ...state,
                deletePermissions:payload
            }
        },
    },
};
