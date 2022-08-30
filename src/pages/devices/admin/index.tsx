import { Component, ReactNode } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DeviceModule from '@/modules/DeviceModule';
import DeviceApi from '@/apis/devices/index';

interface IProps {}

interface IState {
  tab: {
    data: {
      items: [];
      totalCount: 0;
    };
    condition: {
      Keywords: '';
      Page: 1;
      PageSize: 20;
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
    dataIndex: 'statsName',
    key: 'statsName',
    width: 150,
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
    render: () => <a>action</a>,
  },
];

export default class Admin extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  getDevice() {
    var { tab } = this.state;

    DeviceApi.getListAsync(
      tab.condition.Keywords,
      tab.condition.Page,
      tab.condition.PageSize,
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
        <Table
          columns={columns}
          dataSource={tab.data.items}
          scroll={{ x: 1500, y: 300 }}
        />
      </div>
    );
  }
}
