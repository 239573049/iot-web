import request from '@/utils/request';
import DeviceTemplateInput from '@/modules/DeviceTemplateInput';
import { DeviceTemplate } from '@/modules/DeviceTemplateDto';
import { CreateDevice } from '@/modules/devices/Device';

const name = 'iot-admin/api/';

class TemplateApi {
  GetTemplate(input: DeviceTemplateInput) {
    return request.get(
      name +
        'app/device-template?keywords=' +
        input.keywords +
        '&startTime=' +
        input.startTime +
        '&endTime=' +
        input.endTime +
        '&page=' +
        input.page +
        '&pageSize=' +
        input.pageSize,
    );
  }

  UpdateTemplate(data: DeviceTemplate) {
    return request.put(name + 'app/device-template', { data });
  }

  getDeviceAll(keywords) {
    return request.get(
      name + 'app/device-template/device-all?keywords=' + keywords,
    );
  }

  createDevice(data: CreateDevice) {
    return request.post(name + 'app/devices', { data: data });
  }
}

export default new TemplateApi();
