import request from '@/utils/request';

const name = 'auth/api/';

class MenuApi {
  getRoleMenu() {
    return request.get(name + 'app/menu/role-menu');
  }

  getMenuTree() {
    return request.get(name + 'app/menu/menu-tree');
  }

  updateMenuParentId(id, parentId, index) {
    return request.put(name + 'app/menu/' + id + '/menu-parent-id', {
      data: {
        parentId: parentId,
        index: index,
      },
    });
  }
}
export default new MenuApi();
