import Input from '../input';

export class GetDeviceLogListInput extends Input {
  deviceId: string | '';
  device: boolean | '';
}

export class DeviceRunLogDto {
  id: string;

  name: string;

  deviceId: string;

  logs: string;

  type: string;

  icon: string;

  remark: string;

  creationTime: string;
}
