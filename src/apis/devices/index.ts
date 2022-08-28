import request from '@/utils/request';

const name = 'iot-admin/api/';

class DevicesApi {
  getListAsync() {
    return request.get(name + 'app/devices');
  }

  /**
   * 获取设备日志（最新一条）
   * @param deviceId 设备id
   * @returns
   */
  getDeviceLog(deviceId) {
    return request.get(name + 'app/devices/device-log/' + deviceId);
  }
}
export default new DevicesApi();
