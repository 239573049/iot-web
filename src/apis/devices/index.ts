import request from '@/utils/request';

const name = 'iot-admin/api/';

class DevicesApi {
  getListAsync(keywords, page = 1, pageSize = 20) {
    return request.get(
      name +
        'app/devices?Keywords=' +
        keywords +
        '&Page=' +
        page +
        '&PageSize=' +
        pageSize,
    );
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
