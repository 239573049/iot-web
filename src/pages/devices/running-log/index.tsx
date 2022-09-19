import { Component, ReactNode } from 'react';
import TreeDevice from '@/components/device/TreeDevice';
import {
  DeviceRunLogDto,
  GetDeviceLogListInput,
} from '@/modules/devices/DeviceRunLog';
import {
  Col,
  Row,
  Button,
  DatePicker,
  Table,
  Image,
  Input,
  Pagination,
} from 'antd';
import './index.less';
import DeviceRunLogApi from '@/apis/devices/deviceRunLog';
const { RangePicker } = DatePicker;

const columns: any = [
  {
    title: '序号',
    width: 5,
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '设备名称',
    width: 10,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '图标',
    key: 'Icon',
    width: 10,
    render: (value) => {
      return <Image width={50} src={value.icon} />;
    },
  },
  {
    title: '备注',
    width: 10,
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 10,
  },
  {
    title: '创建时间',
    dataIndex: 'creationTime',
    key: 'creationTime',
    width: 10,
  },
  {
    title: '运行日志',
    dataIndex: 'logs',
    key: 'logs',
    width: 30,
  },
];

interface IState {
  input: GetDeviceLogListInput;
  tabData: {
    items: DeviceRunLogDto[];
    totalCount: 0;
  };
}

interface IProps {}

export default class RunLog extends Component<IProps, IState> {
  state: Readonly<IState> = {
    input: {
      deviceId: '',
      keywords: '',
      page: 1,
      pageSize: 10,
      startTime: '',
      endTime: '',
      device: '',
    },
    tabData: {
      items: [],
      totalCount: 0,
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
      tabData = res.data;
      this.setState({
        tabData,
      });
    });
  }
  onShowSizeChange(page, pageSize) {
    var { input } = this.state;
    input.page = page;
    input.pageSize = pageSize;
    this.setState({
      input,
    });
    this.getDate();
  }

  render(): ReactNode {
    var { input, tabData } = this.state;
    return (
      <div style={{ minHeight: '800px', height: '100%' }}>
        <Row>
          <Col span={4}>
            <TreeDevice
              OnSelect={(node) => {
                console.log(node);

                if (node.selected) {
                  input.device = node.node.isLeaf;
                  input.deviceId = node.node.key;
                } else {
                  input.device = '';
                  input.deviceId = '';
                }

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
              pagination={false}
              scroll={{ y: 650 }}
            ></Table>
            <Pagination
              showSizeChanger
              onShowSizeChange={(k, v) => this.onShowSizeChange(k, v)}
              defaultCurrent={input.page}
              total={tabData.totalCount}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
