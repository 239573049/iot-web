import request from '@/utils/request';

const name = 'api/';

class MenuApi {
  getRoleMenu() {
    return request.get(name + 'app/menu/role-menu');
  }
}
export default new MenuApi();
