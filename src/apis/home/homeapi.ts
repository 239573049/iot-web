import request from '@/utils/request';

const name = 'iot-admin/api/';

class homeApi {
  /**获取用户首页展示设备统计 */
  getDeviceHome() {
    return request.get(name + 'app/home/device-home');
  }

  /**获取近七日设备运行统计 */
  getdevicedatelog() {
    return request.get(name + 'app/home/device-date-log');
  }
}
export default new homeApi();
