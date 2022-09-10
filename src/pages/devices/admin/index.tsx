import { Component, ReactNode } from 'react';
import { Table, Button, Input, DatePicker, Image, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DeviceModule from '@/modules/DeviceModule';
import DeviceApi from '@/apis/devices/index';
import Device from './device/index';

const { RangePicker } = DatePicker;
interface IProps {}

interface IState {
  isopen: boolean;
  operation: 'add' | 'update';
  device: any;
  tab: {
    data: {
      items: [];
      totalCount: 0;
    };
    condition: {
      keywords: string | '';
      endTime: Date | '';
      startTime: Date | '';
      page: 1;
      pageSize: 20;
    };
  };
}

const columns: ColumnsType<any> = [
  {
    title: '设备名称',
    width: 100,
    fixed: 'left',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '备注',
    width: 100,
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '状态',
    dataIndex: 'stats',
    key: 'stats',
    width: 150,
  },
  {
    title: '最后活跃时间',
    dataIndex: 'lastTime',
    key: 'lastTime',
    width: 150,
  },
  {
    title: '设备图标',
    dataIndex: 'icon',
    key: 'icon',
    width: 150,
    render: (value) => {
      return <Image width={40} src={value}></Image>;
    },
  },
  {
    title: '设备类型',
    dataIndex: 'type',
    key: 'type',
    width: 150,
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 200,
    render: (value) => (
      <div>
        <Button style={{ margin: '10px' }}>编辑</Button>
        <Button type="primary" style={{ margin: '10px' }}>
          运行日志
        </Button>
        <Button
          onClick={() => {
            var aux = document.createElement('input');
            aux.setAttribute('value', value);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand('copy');
            document.body.removeChild(aux);
            message.success('复制成功');
          }}
        >
          复制id
        </Button>
      </div>
    ),
  },
];

export default class Admin extends Component<IProps, IState> {
  state: Readonly<IState> = {
    tab: {
      data: {
        items: [],
        totalCount: 0,
      },
      condition: {
        keywords: '',
        endTime: '',
        startTime: '',
        page: 1,
        pageSize: 20,
      },
    },
    isopen: false,
    device: null,
    operation: null,
  };

  constructor(props) {
    super(props);
    this.getDevice();
  }

  setTime(value) {
    var { tab } = this.state;
    if (value) {
      tab.condition.startTime = value[0].format('YYYY-MM-DD HH:mm:ss');
      tab.condition.endTime = value[1].format('YYYY-MM-DD HH:mm:ss');
    } else {
      tab.condition.startTime = '';
      tab.condition.endTime = '';
    }
    this.setState({
      tab,
    });
  }

  getDevice() {
    var { tab } = this.state;

    DeviceApi.getListAsync(
      tab.condition.keywords,
      tab.condition.page,
      tab.condition.pageSize,
    ).then((res) => {
      tab.data = res.data;
      this.setState({
        tab,
      });
    });
  }

  render(): ReactNode {
    var { tab, isopen, device, operation } = this.state;
    return (
      <div>
        <div className="search">
          <Input
            value={tab.condition.keywords}
            onChange={(e) => {
              tab.condition.keywords = e.target.value;
              this.setState({ tab });
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
            onClick={() => this.getDevice()}
            type="primary"
            style={{ width: '80px', margin: '10px' }}
          >
            搜索
          </Button>
          <Button
            onClick={() => {
              operation = 'add';
              this.setState({
                isopen: true,
                operation,
              });
            }}
            type="primary"
            style={{ width: '80px', margin: '10px' }}
          >
            新增设备
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={tab.data.items}
          scroll={{ x: 1500, y: 300 }}
        />
        <Device
          operation={operation}
          isOpen={isopen}
          device={device}
          onCancel={() => {
            this.setState({ isopen: false });
          }}
        />
      </div>
    );
  }
}
