import { Component, ReactNode } from 'react';
import { Tabs } from 'antd';
import styles from 'index.less';
import MenuTree from './MenuTree';
const { TabPane } = Tabs;

export default class Menu extends Component {
  onChange(key) {
    console.log(key);
  }

  render(): ReactNode {
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.onChange}>
          <TabPane tab="Tab 1" key="1">
            <MenuTree />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
