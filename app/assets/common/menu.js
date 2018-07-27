import { isUrl } from '../utils/utils';

const menuData = [
    {
        name:'高校排名',
        icon:'bars',
        path:'university',
        children:[
            {
                name:'高校列表',
                path:'universityList'
            },
            {
                name:'高校信息',
                path:'universityInfo/:id',
                hideInMenu: true,
            },
            {
                name:'部门信息',
                path:'department',
            }
        ]
    },
    {
        name:'项目',
        icon:'profile',
        path:'project',
        children:[
            {
                name:'项目列表',
                path:'projectList'
            },
            {
                name:'新增项目',
                path:'addProject'
            }
        ]
    },
    {
        name:'新闻',
        icon:'notification',
        path:'news',
        children:[
            {
                name:'新闻列表',
                path:'newsList'
            },
            {
                name:'添加新闻',
                path:'addNews'
            }
        ]
    },
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
    {
        name:'账户设置',
        icon:'setting',
        path:'account',
        children:[
            {
                name:'用户列表',
                path:'accountList'
            }
        ]
    }
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
