import { Component, ReactNode } from 'react';
import { Button, Modal, Select, Form, Input, message, Image } from 'antd';
import { DeviceTemplateDto, CreateDevice } from '@/modules/devices/Device';
import DevoceApi from '@/apis/devices/templateApi';

const { Option } = Select;

interface IProps {
  operation: 'add' | 'update';
  isOpen: boolean;
  onCancel: any;
  device: DeviceTemplateDto;
}

interface IState {
  devices: DeviceTemplateDto[];
}

export default class Device extends Component<IProps, IState> {
  state: Readonly<IState> = {
    devices: [],
  };

  handleOk(value) {
    var device = new CreateDevice();
    device.deviceTemplateId = value.id.value;
    device.name = value.name;
    device.remark = value.remark;

    DevoceApi.createDevice(device).then((res) => {
      if (res.code === '200') {
        message.success('添加成功');
      } else {
        message.error(res.message);
      }
    });
  }

  constructor(props) {
    super(props);
    this.getDeviceTemplateAll();
  }

  getDeviceTemplateAll() {
    var { devices } = this.state;

    DevoceApi.getDeviceAll('').then((res) => {
      devices = res.data;
      this.setState({
        devices,
      });
    });
  }

  render() {
    var { operation, isOpen, onCancel, device } = this.props;
    var { devices } = this.state;
    let body = null;
    if (operation === 'add') {
      body = (
        <Form initialValues={device} onFinish={(value) => this.handleOk(value)}>
          <Form.Item name="name" label="名称">
            <Input />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input />
          </Form.Item>
          <Form.Item name="id">
            <Select labelInValue>
              {devices.map((x) => {
                return (
                  <Option key={x.id} name="id" value={x.id}>
                    <Image width="30px" src={x.icon}></Image> {x.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="id">
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      );
    } else {
      body = <Form></Form>;
    }

    return (
      <Modal
        title={operation === 'add' ? '新增设备' : '编辑设备'}
        visible={isOpen}
        footer={[]}
        onCancel={onCancel}
      >
        {body}
      </Modal>
    );
  }
}
