import { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, Form, Input, message } from 'antd';
import templateApi from '@/apis/devices/templateApi';

interface IProps {
  isOpen: any;
  operation: 'add' | 'update';
  onCancel: any;
  template: any;
}

interface IState {
  templates: any;
}

export default class OperationDevice extends Component<IProps, IState> {
  state: Readonly<IState> = {
    templates: {
      id: '',
      icon: '',
      name: '',
      remark: '',
      type: '',
      userId: '',
    },
  };

  constructor(props: IProps | Readonly<IProps>) {
    super(props);

    this.setState({
      templates: this.props.template,
    });
  }

  handleOk(value) {
    var { template, operation } = this.props;

    if (operation === 'add') {
      templateApi.createTemplate(value).then((res) => {
        if (res.code === '200') {
          message.success('成功');
          this.props.onCancel(true);
        } else {
          message.error(res.message);
        }
      });
    } else {
      templateApi.UpdateTemplate(value).then((res) => {
        if (res.code === '200') {
          message.success('成功');
          this.props.onCancel(true);
        } else {
          message.error(res.message);
        }
      });
    }
  }

  handleChange(value) {}

  beforeUpload(value) {
    var { templates } = this.state;
    var reader = new FileReader();
    templates.file = value;
    reader.readAsDataURL(value);
    reader.onload = () => {
      templates.icon = reader.result;
      console.log(templates);
      this.setState({
        templates,
      });
    };
  }

  render() {
    var { operation, template } = this.props;
    var { templates } = this.state;
    let body = null;

    if (operation === 'add') {
      body = (
        <Form
          initialValues={template}
          onFinish={(value) => this.handleOk(value)}
        >
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
                {templates?.icon === '' ? (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传图标</div>
                  </div>
                ) : (
                  <img
                    src={templates?.icon}
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
          <Form.Item name="id">
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      );
    } else {
      body = (
        <Form
          initialValues={template}
          onFinish={(value) => this.handleOk(value)}
        >
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
          <Form.Item name="id">
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      );
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
