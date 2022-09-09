import request from '@/utils/request';
import DeviceTemplateInput from '@/modules/DeviceTemplateInput';
import { DeviceTemplate } from '@/modules/DeviceTemplateDto';
const name = 'iot-admin/api/';

class TemplateApi {
  GetTemplate(input: DeviceTemplateInput) {
    console.log(input);

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
}

export default new TemplateApi();
