import { Component, ReactNode } from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GaugeChart, CanvasRenderer]);

import DeviceApi from '@/apis/devices/index';

interface IProps {
  device: any;
}

interface IState {
  deviceLog: any;
  option: any;
  myChart: any;
}

export default class DeviceShow extends Component<IProps, IState> {
  state: Readonly<IState> = {
    deviceLog: undefined,
    option: {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 30,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 30,
            },
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -20,
            color: '#999',
            fontSize: 20,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 60,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: 'auto',
          },
          data: [
            {
              value: 0,
            },
          ],
        },
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 80,
          itemStyle: {
            color: '#FD7347',
          },
          progress: {
            show: true,
            width: 8,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: 0,
            },
          ],
        },
      ],
    },
    myChart: null,
  };

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount(): void {
    var { option, myChart } = this.state;
    var chartDom = document.getElementById(this.props.device.id);
    myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    this.setState({ myChart });
  }

  getDeviceLog() {
    if (this.props.device?.id) {
      DeviceApi.getDeviceLog(this.props.device.id).then((res) => {
        var { myChart } = this.state;
        var value = JSON.parse(res.data.data).Temperature;
        value = parseInt(value);
        myChart.setOption({
          series: [
            {
              data: [
                {
                  value: value,
                },
              ],
            },
            {
              data: [
                {
                  value: value,
                },
              ],
            },
          ],
        });
      });
    }
  }

  render() {
    var { device } = this.props;
    var { deviceLog } = this.state;
    this.getDeviceLog();
    return (
      <div>
        <div style={{ height: '500px' }} id={this.props.device.id}></div>
      </div>
    );
  }
}
