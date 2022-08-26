import request from '@/pages/utils/request';
import AuthModule from '@/modules/AuthModule';

const name = 'api/';

class AuthApi {
  /**
   * 授权
   * @param value 账号信息
   */
  auth(value: AuthModule) {
    return request.post(name + 'app/auth/auth', { data: value });
  }

  /**
   * 刷新token
   */
  refresh() {
    return request.put(name + 'app/auth/auth');
  }
}

export default new AuthApi();
