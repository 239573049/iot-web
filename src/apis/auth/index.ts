import request from '@/utils/request';
import AuthModule from '@/modules/AuthModule';

const name = 'auth/api/';

class AuthApi {
  /**
   * 授权
   * @param value 账号信息
   */
  auth(value: AuthModule) {
    return request.post(name + 'Auth', { data: value });
  }

  /**
   * 刷新token
   */
  refresh() {
    return request.put(name + 'Auth/refresh');
  }
}

export default new AuthApi();
