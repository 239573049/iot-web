import request from '@/utils/request';
import { GetDeviceLogListInput } from '@/modules/devices/DeviceRunLog';

const name = 'iot-admin/api/';

class DeviceRunLogApi {
  GetList(input: GetDeviceLogListInput) {
    return request.get(
      name +
        'app/device-run-log?DeviceId=' +
        input.deviceId +
        '&Keywords=' +
        input.keywords +
        '&StartTime=' +
        input.startTime +
        '&EndTime=' +
        input.endTime +
        '&Page=' +
        input.page +
        '&PageSize=' +
        input.pageSize +
        '&device' +
        input.device,
    );
  }
}

export default new DeviceRunLogApi();
