import { Component, ReactNode } from 'react';
import { Card, Col, Row, Avatar, Modal } from 'antd';
import DeviceApi from '@/apis/devices/index';
import styles from './index.less';
import DeviceShow from './device-show/index';

export default class Home extends Component {
  state = {
    devices: [],
    isModalVisible: false,
    device: null,
  };
  constructor(props) {
    super(props);
    this.getDeviceList();
  }

  getDeviceList() {
    var { devices } = this.state;
    DeviceApi.getListAsync('', 1, 100).then((res) => {
      devices = res.data.items;
      this.setState({
        devices,
      });
    });
  }

  onDeviceClick(value) {
    this.setState({
      device: value,
      isModalVisible: true,
    });
  }

  onModalCancel() {
    this.setState({
      isModalVisible: false,
    });
  }

  render(): ReactNode {
    var { devices, isModalVisible, device } = this.state;
    return (
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {devices.map((x) => {
            return (
              <div className={styles.row} onClick={() => this.onDeviceClick(x)}>
                <Avatar
                  className={styles.top}
                  shape="square"
                  size={64}
                  src={x.icon}
                />
                <br />
                <div className="row-data-name">{x.name}</div>
                <div className="row-data-name">{x.remark}</div>
              </div>
            );
          })}
        </Row>
        <Modal
          title={'温度计'}
          visible={isModalVisible}
          footer={[]}
          destroyOnClose={false}
          onCancel={() => this.onModalCancel()}
        >
          <DeviceShow device={device}></DeviceShow>
        </Modal>
      </div>
    );
  }
}
