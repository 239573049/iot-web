import { Component, ReactNode } from 'react';
import templateApi from '@/apis/devices/templateApi';
import DeviceTemplateInput from '@/modules/DeviceTemplateInput';
import { DeviceTemplate } from '@/modules/DeviceTemplateDto';
import { Input, DatePicker, Button, Table, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './index.less';

const { RangePicker } = DatePicker;

interface IState {
  input: DeviceTemplateInput;
  data: {
    items: DeviceTemplate[];
    totalCount: number;
  };
}

interface IProps {}

const columns: ColumnsType<any> = [
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
    fixed: 'right',
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
    fixed: 'left',
  },
  {
    title: '类型',
    dataIndex: 'tyleName',
    key: 'tyleName',
    width: 150,
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => (
      <div>
        <Button style={{ margin: '10px' }}>编辑</Button>
        <Button type="primary" danger>
          删除
        </Button>
      </div>
    ),
  },
];
export default class Template extends Component<IProps, IState> {
  state: Readonly<IState> = {
    input: new DeviceTemplateInput(),
    data: {
      items: [],
      totalCount: 0,
    },
  };

  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.getTemplate();
  }

  getTemplate() {
    var { input, data } = this.state;
    templateApi.GetTemplate(input).then((res: any) => {
      console.log(res.data);
      data = res.data;
      this.setState({ data });
    });
  }
  setTime(value) {
    if (value) {
      var { input } = this.state;
      input.startTime = value[0].format('YYYY-MM-DD HH:mm:ss');
      input.endTime = value[1].format('YYYY-MM-DD HH:mm:ss');
      console.log(input);
    }
  }

  render(): ReactNode {
    var { input, data } = this.state;
    return (
      <div>
        <div className="search">
          <Input
            value={input.keywords}
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
            style={{ width: '80px' }}
          >
            搜索
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data.items}
          scroll={{ x: 1500, y: 300 }}
        />
      </div>
    );
  }
}
