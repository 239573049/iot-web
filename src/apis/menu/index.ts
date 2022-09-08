import request from '@/utils/request';

const name = 'auth/api/';

class MenuApi {
  getRoleMenu() {
    return request.get(name + 'Menu/role-menu');
  }

  getMenuTree() {
    return request.get(name + 'Menu/menu-tree');
  }

  updateMenuParentId(id, parentId, index) {
    return request.put(name + 'Menu/menu-parent' + id, {
      data: {
        parentId: parentId,
        index: index,
      },
    });
  }
}
export default new MenuApi();
