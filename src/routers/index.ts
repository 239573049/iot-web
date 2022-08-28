export const routes: any[] = [
  {
    name: '登录',
    path: '/',
    component: '@/pages/login/index',
  },
  {
    path: '/admin',
    flatMenu: true,
    component: '@/layouts/index',
    routes: [
      {
        name: '首页',
        path: '/admin/home',
        component: '@/pages/home/index',
        icon: 'HomeOutlined',
      },
      {
        name: '权限管理',
        path: '/admin/authority',
        icon: 'SettingOutlined',
        routes: [
          {
            name: '角色管理',
            path: '/admin/authority/role',
            component: '@/pages/authority/roles/index',
          },
          {
            name: '用户管理',
            path: '/admin/authority/user',
            component: '@/pages/authority/users/index',
          },
          {
            name: '菜单管理',
            path: '/admin/authority/menu',
            component: '@/pages/authority/menus/index',
          },
        ],
      },
      {
        name: '设备',
        path: '/admin/devices',
        icon: 'DashboardOutlined',
        routes: [
          {
            name: '设备数据预览',
            path: '/admin/devices/home',
            component: '@/pages/devices/home/index',
          },
          {
            name: '设备管理',
            path: '/admin/devices/admin',
            component: '@/pages/devices/admin/index',
          },
        ],
      },
      {
        name: '用户管理',
        path: '/admin/user',
        icon: 'UserOutlined',
        component: '@/pages/users/index',
      },
    ],
  },
];

export default routes;
