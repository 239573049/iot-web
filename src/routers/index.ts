export const routes: any[] = [
  {
    name: '登录',
    path: '/login',
    component: '@/pages/login/index',
  },
  {
    path: '/',
    flatMenu: true,
    component: '@/layouts/index',
    routes: [
      {
        name: '首页',
        path: '/',
        component: '@/pages/home/index',
        icon: 'HomeOutlined',
      },
      {
        name: '权限管理',
        path: '/authority',
        icon: 'SettingOutlined',
        routes: [
          {
            name: '角色管理',
            path: '/authority/role',
            component: '@/pages/authority/roles/index',
          },
          {
            name: '用户管理',
            path: '/authority/user',
            component: '@/pages/authority/users/index',
          },
          {
            name: '菜单管理',
            path: '/authority/menu',
            component: '@/pages/authority/menus/index',
          },
        ],
      },
      {
        name: '设备',
        path: '/devices',
        icon: 'DashboardOutlined',
        routes: [
          {
            name: '设备模板',
            path: '/devices/template',
            component: '@/pages/devices/template/index',
          },
          {
            name: '设备运行日志',
            path: '/devices/running-log',
            component: '@/pages/devices/running-log/index',
          },
          {
            name: '设备管理',
            path: '/devices/admin',
            component: '@/pages/devices/admin/index',
          },
        ],
      },
      {
        name: '用户管理',
        path: '/user',
        icon: 'UserOutlined',
        component: '@/pages/users/index',
      },
    ],
  },
];

export default routes;
