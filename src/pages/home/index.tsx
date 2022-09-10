import './index.less';
import { Card } from 'antd';
import * as echarts from 'echarts';
import { Component, ReactNode } from 'react';
import DeviceApi from '@/apis/devices/index';
import { DeviceHomeDto } from '@/modules/devices/Device';
import Icon from '@ant-design/icons';
interface IState {
  deviceHome: DeviceHomeDto;
}

interface IProps {}

export default class Home extends Component<IProps, IState> {
  state: Readonly<IState> = {
    deviceHome: new DeviceHomeDto(),
  };

  constructor(props) {
    super(props);
    this.getHome();
  }

  getHome() {
    DeviceApi.getDeviceHome().then((res) => {
      this.setState({
        deviceHome: res.data,
      });
    });
  }

  render() {
    var { deviceHome } = this.state;

    const icon = () => (
      <svg
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2544"
        width="60"
        height="60"
      >
        <path
          d="M260.096 544H160a32 32 0 0 1-32-32V256h480v256a32 32 0 0 1-32 32h-54.976a32 32 0 0 0 0 64H576a96 96 0 0 0 96-96V160a96 96 0 0 0-96-96H160a96 96 0 0 0-96 96v352a96 96 0 0 0 96 96h100.096a32 32 0 0 0 0-64zM128 160a32 32 0 0 1 32-32h416a32 32 0 0 1 32 32v32H128V160z"
          p-id="2545"
        ></path>
        <path
          d="M864 416h-90.88a32 32 0 0 0 0 64H864a32 32 0 0 1 32 32v256H416v-256a32 32 0 0 1 32-32h63.072a32 32 0 0 0 0-64H448a96 96 0 0 0-96 96v352a96 96 0 0 0 96 96h416a96 96 0 0 0 96-96V512a96 96 0 0 0-96-96z m32 448a32 32 0 0 1-32 32H448a32 32 0 0 1-32-32v-32h480v32z"
          p-id="2546"
        ></path>
      </svg>
    );

    return (
      <div className="body">
        <Card className="card">
          <div>设备数量：{deviceHome.deviceCount}</div>
          <div>
            <Icon component={icon} />
          </div>
        </Card>
        <Card className="card">
          <div>设备模板数据：{deviceHome.templateCount}</div>
          <div>
            <Icon component={icon} />
          </div>
        </Card>
        <Card className="card">
          <div>今日运行日志数量：{deviceHome.todayLogCount}</div>
          <div>
            <Icon component={icon} />
          </div>
        </Card>
        <Card className="card">
          <div>运行日志总数：{deviceHome.totalCount}</div>
          <div>
            <Icon component={icon} />
          </div>
        </Card>
      </div>
    );
  }
}
