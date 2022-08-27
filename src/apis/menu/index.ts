import request from '@/utils/request';

const name = 'api/';

class MenuApi {
  getRoleMenu() {
    return request.get(name + 'app/menu/role-menu');
  }

  getMenuTree() {
    return request.get(name + 'app/menu/menu-tree');
  }
}
export default new MenuApi();
