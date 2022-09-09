import { Component, ReactNode } from 'react';
import templateApi from '@/apis/devices/templateApi';
import DeviceTemplateInput from '@/modules/DeviceTemplateInput';
import { DeviceTemplate } from '@/modules/DeviceTemplateDto';
import { Input, DatePicker, Button, Table, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './index.less';
import OperationDevice from './operationdevice';
const { RangePicker } = DatePicker;

interface IState {
  input: DeviceTemplateInput;
  data: {
    items: DeviceTemplate[];
    totalCount: number;
  };
  isOpen: boolean;
  operationTemplate: any;
  operation: 'add' | 'update';
  columns: any[];
}

interface IProps {}

export default class Template extends Component<IProps, IState> {
  state: Readonly<IState> = {
    input: {
      keywords: '',
      endTime: '',
      startTime: '',
      page: 1,
      pageSize: 20,
    },
    data: {
      items: [],
      totalCount: 0,
    },
    isOpen: false,
    operation: undefined,
    operationTemplate: null,
    columns: [
      {
        title: '设备名称',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      {
        title: '图标',
        key: 'Icon',
        width: 100,
        render: (value) => {
          console.log(value);

          return <Image width={50} src={value.icon} />;
        },
      },
      {
        title: '备注',
        width: 100,
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 150,
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (value) => (
          <div>
            <Button
              style={{ margin: '10px' }}
              onClick={() => this.updateDeviceTemplate(value)}
            >
              编辑
            </Button>
            <Button type="primary" danger>
              删除
            </Button>
          </div>
        ),
      },
    ],
  };

  updateDeviceTemplate(value) {
    var { isOpen, operation, operationTemplate } = this.state;
    isOpen = true;
    operation = 'update';
    operationTemplate = value;
    this.setState({
      isOpen,
      operation,
      operationTemplate,
    });
  }

  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.getTemplate();
  }

  getTemplate() {
    var { input, data } = this.state;
    templateApi.GetTemplate(input).then((res: any) => {
      data = res.data;
      this.setState({ data });
    });
  }
  setTime(value) {
    var { input } = this.state;
    if (value) {
      input.startTime = value[0].format('YYYY-MM-DD HH:mm:ss');
      input.endTime = value[1].format('YYYY-MM-DD HH:mm:ss');
      console.log(input);
    } else {
      input.startTime = '';
      input.endTime = '';
    }
  }

  render(): ReactNode {
    var { columns, input, data, isOpen, operation, operationTemplate } =
      this.state;
    return (
      <div>
        <div className="search">
          <Input
            value={input.keywords}
            onChange={(e) => {
              input.keywords = e.target.value;
              this.setState({ input });
            }}
            placeholder="请输入搜索内容"
            style={{ width: '200px', margin: '10px' }}
          />
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            style={{ margin: '10px' }}
            onChange={(value) => this.setTime(value)}
          />
          <Button
            onClick={() => this.getTemplate()}
            type="primary"
            style={{ width: '80px', margin: '10px' }}
          >
            搜索
          </Button>

          <Button
            onClick={() =>
              this.setState({
                isOpen: true,
                operation: 'add',
              })
            }
            type="primary"
            style={{ width: '80px', margin: '10px' }}
          >
            新增模板
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data.items}
          scroll={{ x: 1500, y: 800 }}
        />
        <OperationDevice
          isOpen={isOpen}
          operation={operation}
          template={operationTemplate}
          onCancel={(value) => {
            this.setState({
              isOpen: false,
            });
            if (value === true) {
              this.getTemplate();
            }
          }}
        />
      </div>
    );
  }
}
