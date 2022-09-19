import './index.less';
import { Card } from 'antd';
import * as echarts from 'echarts';
import { Component, ReactNode } from 'react';
import DeviceApi from '@/apis/devices/index';
import { DeviceHomeDto } from '@/modules/devices/Device';
import Icon from '@ant-design/icons';
import homeApi from '@/apis/home/homeapi';

interface Series {
  name: string | '运行日志';
  type: string | 'line';
  data: any[];
  stack: 'Total';
  areaStyle: {};
  label: {
    show: true;
    position: 'top';
  };
  emphasis: {
    focus: 'series';
  };
}

interface IState {
  deviceHome: DeviceHomeDto;
  device_show_data: any;
  device_show: any;
  getdevicelog: {
    date: string[];
    series: Series[];
  };
}

interface IProps {}

export default class Home extends Component<IProps, IState> {
  state: Readonly<IState> = {
    deviceHome: new DeviceHomeDto(),
    device_show_data: undefined,
    device_show: undefined,
    getdevicelog: {
      date: [],
      series: [],
    },
  };

  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.getHome();
    this.getDeviceDateLog();
  }

  getdevice_show_center() {
    var chartDom = document.getElementById('device-show_center');
    var device_show = echarts.init(chartDom);
    var { deviceHome } = this.state;

    var device_show_data = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '3%',
        left: 'center',
      },
      series: [
        {
          name: '设备总览',
          type: 'pie',
          radius: ['30%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: deviceHome.deviceCount,
              name: `设备总数（${deviceHome.deviceCount}）`,
            },
            {
              value: deviceHome.templateCount,
              name: `设备模板总数（${deviceHome.templateCount}）`,
            },
          ],
        },
      ],
    };
    device_show.setOption(device_show_data);
  }

  getdevicelog_show_center() {
    var chartDom = document.getElementById('devicelog-show_center');
    var device_show = echarts.init(chartDom);
    var { deviceHome } = this.state;

    var device_show_data = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '3%',
        left: 'center',
      },
      series: [
        {
          name: '设备总览',
          type: 'pie',
          radius: ['30%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: deviceHome.todayLogCount,
              name: `今日日志总数（${deviceHome.todayLogCount}）`,
            },
            {
              value: deviceHome.totalCount,
              name: `运行日志总数（${deviceHome.totalCount}）`,
            },
          ],
        },
      ],
    };
    device_show.setOption(device_show_data);
  }

  getdevicelog_show() {
    var { getdevicelog } = this.state;

    var chartDom = document.getElementById('devicelog-show');
    var myChart = echarts.init(chartDom);
    var option;

    getdevicelog.series.forEach((x: Series) => {
      x.label = {
        show: true,
        position: 'top',
      };
    });

    option = {
      title: {
        text: '日志总览',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['运行日志'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: getdevicelog.date,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: getdevicelog.series,
    };

    myChart.setOption(option);
  }

  getDeviceDateLog() {
    var { getdevicelog } = this.state;
    homeApi.getdevicedatelog().then((res) => {
      getdevicelog = res.data;
      this.setState({
        getdevicelog,
      });
      this.getdevicelog_show();
    });
  }

  getHome() {
    homeApi.getDeviceHome().then((res) => {
      this.setState({
        deviceHome: res.data,
      });

      this.getdevice_show_center();
      this.getdevicelog_show_center();
    });
  }

  render() {
    var { deviceHome } = this.state;
    return (
      <div className="body">
        <div id="device-show_center" className="device-show"></div>

        <div id="devicelog-show_center" className="device-show"></div>

        <div id="devicelog-show" className="device-show"></div>
      </div>
    );
  }
}
