import { Component, ReactNode } from 'react';
import { Button, Modal, Select, Form, Input, message } from 'antd';
import { DeviceTemplateDto } from '@/modules/devices/Device';

interface IProps {
  operation: 'add' | 'update';
  isOpen: boolean;
  onCancel: any;
  device: DeviceTemplateDto;
}

interface IState {}

export default class Device extends Component<IProps, IState> {
  handleOk(value) {}

  getSelect() {
    return (
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      ></Select>
    );
  }

  render() {
    var { operation, isOpen, onCancel, device } = this.props;

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
          <Form.Item></Form.Item>
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
        title={operation === 'add' ? '新增模板' : '编辑模板'}
        visible={this.props.isOpen}
        footer={[]}
        onCancel={this.props.onCancel}
      >
        {body}
      </Modal>
    );
  }
}
