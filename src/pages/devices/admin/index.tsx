import { Component, ReactNode } from 'react';
import { Table, Button, Input, DatePicker, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DeviceModule from '@/modules/DeviceModule';
import DeviceApi from '@/apis/devices/index';

const { RangePicker } = DatePicker;
interface IProps {}

interface IState {
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
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '备注',
    width: 100,
    dataIndex: 'remark',
    key: 'remark',
    fixed: 'left',
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
    render: (value) => <Image width={20} src={value.icon}></Image>,
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
    width: 100,
    render: (value) => (
      <div>
        <Button style={{ margin: '10px' }}>编辑</Button>
        <Button type="primary" danger>
          删除
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
  };

  constructor(props) {
    super(props);
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
    var { tab } = this.state;
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
            onClick={() => this.getDevice()}
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
      </div>
    );
  }
}
