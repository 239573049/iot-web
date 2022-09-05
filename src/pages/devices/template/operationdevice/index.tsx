import { Component, ReactNode } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Checkbox, Upload, Form, Input } from 'antd';

interface IProps {
  isOpen: any;
  operation: 'add' | 'update';
  onCancel: any;
  template: any;
}

interface IState {
  template: any;
}

export default class OperationDevice extends Component<IProps, IState> {
  state: Readonly<IState> = {
    template: undefined,
  };

  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.setState({
      template: this.props,
    });
  }

  handleOk(value) {}

  handleChange(value) {
    console.log(value);
  }

  beforeUpload(value) {
    var { template } = this.props;
    var reader = new FileReader();
    template.file = value;
    reader.readAsDataURL(value);
    reader.onload = () => {
      template.icon = reader.result;
      this.setState({
        template: template,
      });
    };
  }

  render(): ReactNode {
    var { isOpen, operation, template } = this.props;

    let body = null;
    if (operation === 'add') {
      body = <div></div>;
    } else {
      body = (
        <Form initialValues={template}>
          <Form.Item name="name" label="名称">
            <Input />
          </Form.Item>
          <Form.Item label="图标" valuePropName="icon" name="icon">
            <Upload
              action="/upload.do"
              name="icon"
              showUploadList={false}
              onChange={(value) => this.handleChange(value)}
              beforeUpload={(value) => this.beforeUpload(value)}
              listType="picture-card"
            >
              <div>
                {template?.icon === null ? (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传图标</div>
                  </div>
                ) : (
                  <img
                    src={template?.icon}
                    alt="图标"
                    style={{ width: '80px' }}
                  />
                )}
              </div>
            </Upload>
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input />
          </Form.Item>
          <Form.Item name="type" label="设备类型">
            <Input />
          </Form.Item>
        </Form>
      );
    }

    return (
      <Modal
        title={operation === 'add' ? '新增模板' : '编辑模板'}
        visible={this.props.isOpen}
        onOk={this.handleOk}
        onCancel={this.props.onCancel}
      >
        {body}
      </Modal>
    );
  }
}
