import { Component, ReactNode } from 'react';
import TreeDevice from '@/components/device/TreeDevice';
import { GetDeviceLogListInput } from '@/modules/devices/DeviceRunLog';
import { Col, Row, Button, DatePicker, Table, Image, Input } from 'antd';
import './index.less';

const { RangePicker } = DatePicker;

const columns: any = [
  {
    title: '设备名称',
    width: 50,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '图标',
    key: 'Icon',
    width: 80,
    render: (value) => {
      console.log(value);

      return <Image width={50} src={value.icon} />;
    },
  },
  {
    title: '备注',
    width: 80,
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 80,
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

interface IState {
  input: GetDeviceLogListInput;
}

interface IProps {}

export default class RunLog extends Component<IProps, IState> {
  state: Readonly<IState> = {
    input: new GetDeviceLogListInput(),
  };

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
    var { input } = this.state;
    return (
      <div style={{ minHeight: '800px', height: '100%' }}>
        <Row>
          <Col span={4}>
            <TreeDevice />
          </Col>
          <Col span={18}>
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
              <Button type="primary" style={{ width: '80px', margin: '10px' }}>
                搜索
              </Button>
            </div>
            <Table columns={columns} scroll={{ x: 1500, y: 800 }} />
          </Col>
        </Row>
      </div>
    );
  }
}
