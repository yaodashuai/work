import { stringify } from 'qs';
import request from '../utils/request';


export async function fetchUniversityList(params) {
    return request(`/api/universities?${stringify(params)}`);
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}


export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function fakeAccountLogin(params) {
  return request('/api/users/sign-in/system', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/users/sign-up', {
    method: 'POST',
    body: params,
  });
}

export async function removeUniversityItem(params) {
    return request(`/api/universities/${params.universityId}`, {
        method: 'DELETE',
    });
}
export async function removeUniversityRank(params) {
    return request(`/api/universities-ranking/${params.universityId}?${stringify(params)}`, {
        method: 'DELETE',
    });
}
export async function fetchArea(params) {
    return request(`/api/administrativeDivisions?${stringify(params)}`, );
}
export async function fetchAccessList(params) {
    return request(`/api/roles?${stringify(params)}`, );
}
export async function fetchPermissionGroup(params) {
    return request(`/api/permission-categories?${stringify(params)}`, );
}
export async function allocationPermissions(params) {
    return request(`/api/roles/${params.roleId}/permissions`, {
        method: 'POST',
        body: params,
    });
}
export async function addRole(params) {
    return request(`/api/roles`, {
        method: 'POST',
        body: params,
    });
}
export async function deleteRole(params) {
    return request(`/api/roles/${params.roleId}`, {
        method: 'DELETE',
    });
}
export async function updateRole(params) {
    return request(`/api/roles/${params.roleId}`, {
        method: 'PUT',
        body: params,
    });
}
export async function deletePermissions(params) {
    const data = {
        permissionIds: params.permissionIds
    }
    return request(`/api/roles/${params.roleId}/permissions`, {
        method: 'DELETE',
        body:data
    });
}
export async function fetchDepartment() {
    return request(`/api/departments`, );
}
export async function fetchList(params) {
    return request(`/api/countries?${stringify(params)}`, );
}
export async function addRank(params) {
    return request(`/api/universities-ranking/${params.universityId}/rankings`, {
        method: 'POST',
        body: params,
    });
}
export async function updatedRank(params) {
    return request(`/api/universities-ranking/${params.universityId}/rankings`, {
        method: 'PUT',
        body: params,
    });
}
export async function createUniversity(params) {
    return request(`/api/universities`, {
        method: 'POST',
        body: params,
    });
}
export async function updateauthToken() {
    return request(`/api/users/token/refresh`,{
        method:'PUT'
    } );
}
export async function editUniversityInfo(params) {
    return request(`/api/universities/${params.universityId}`,{
        method:'PUT',
        body:params
    })
}
export async function fetchUniversityInfo(params) {
    return request(`/api/universities/${params.universityId}`, );
}
export async function fetchDepartmentList(params) {
    return request(`/api/university-departments/${params.universityId}?${stringify(params)}`, );
}
export async function fetchRank(params) {
    return request(`/api/universities-ranking/${params.universityId }?${stringify(params)}`, );
}

export async function queryNotices() {
  return request('/api/notices');
}
export async function getQnToken() {
    return request('/upload-token');
}
