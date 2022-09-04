import request from '@/utils/request';
import DeviceTemplateInput from '@/modules/DeviceTemplateInput';
const name = 'iot-admin/api/';

class TemplateApi {
  GetTemplate(input: DeviceTemplateInput) {
    return request.get(name + 'app/device-template', { data: input });
  }
}

export default new TemplateApi();
