import { Component, ReactNode } from 'react';
import TreeDevice from '@/components/device/TreeDevice';
import {
  DeviceRunLogDto,
  GetDeviceLogListInput,
} from '@/modules/devices/DeviceRunLog';
import { Col, Row, Button, DatePicker, Table, Image, Input } from 'antd';
import './index.less';
import DeviceRunLogApi from '@/apis/devices/deviceRunLog';
const { RangePicker } = DatePicker;

const columns: any = [
  {
    title: '设备名称',
    width: 30,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '图标',
    key: 'Icon',
    width: 30,
    render: (value) => {
      return <Image width={50} src={value.icon} />;
    },
  },
  {
    title: '备注',
    width: 30,
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 30,
  },
  {
    title: '运行日志',
    dataIndex: 'Logs',
    key: 'Logs',
    width: 30,
  },
];

interface IState {
  input: GetDeviceLogListInput;
  tabData: {
    items: DeviceRunLogDto[];
    TotalCount: 0;
  };
}

interface IProps {}

export default class RunLog extends Component<IProps, IState> {
  state: Readonly<IState> = {
    input: {
      deviceId: '',
      keywords: '',
      page: 1,
      pageSize: 20,
      startTime: '',
      endTime: '',
      device: '',
    },
    tabData: {
      items: [],
      TotalCount: 0,
    },
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
  constructor(props) {
    super(props);
    this.getDate();
  }

  getDate() {
    var { input, tabData } = this.state;

    DeviceRunLogApi.GetList(input).then((res) => {
      tabData = res;
    });
  }

  render(): ReactNode {
    var { input, tabData } = this.state;
    return (
      <div style={{ minHeight: '800px', height: '100%' }}>
        <Row>
          <Col span={4}>
            <TreeDevice
              OnSelect={(node) => {
                input.device = !node.selected;
                input.deviceId = node.node.key;
                this.setState({
                  input,
                });
                this.getDate();
              }}
            />
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
            <Table
              dataSource={tabData.items}
              columns={columns}
              scroll={{ y: 800 }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
