import { ProLayout } from '@ant-design/pro-components';
import { useState, Component, ReactNode } from 'react';
import { Avatar, Popover, Button } from 'antd';
import { UserOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import styles from './index.less';
import MenuApi from '@/apis/menu/index';
import Icon from '@/utils/icon';
import Menu from './menu';

export default class App extends Component {
  state = {
    pathname: null,
    menus: null,
  };

  constructor(props) {
    super(props);
    this.getMenu();
  }

  getMenu() {
    MenuApi.getRoleMenu().then((res) => {
      this.menuIcon(res.data);
      this.setState({
        menus: {
          routes: [
            {
              path: '/',
              flatMenu: true,
              component: '@/layouts/index',
              routes: res.data,
            },
          ],
        },
      });
    });
  }

  menuIcon(data: any) {
    data.forEach((d) => {
      d.icon = Icon[d.icon];
      if (d.routes.length > 0) {
        this.menuIcon(d.routes);
      }
    });
  }

  render(): ReactNode {
    var { pathname, menus } = this.state;
    return (
      <div
        style={{
          height: '100vh',
        }}
      >
        <ProLayout
          route={menus}
          location={{
            pathname,
          }}
          navTheme="light"
          fixSiderbar
          onMenuHeaderClick={(e) => console.log(e)}
          title="Iot管理平台"
          logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
          menuHeaderRender={(logo, title) => (
            <div
              id="customize_menu_header"
              onClick={() => {
                window.open('https://cn.bing.com/');
              }}
            >
              {logo}
              {title}
            </div>
          )}
          menuItemRender={(item, dom: any) => (
            <a
              onClick={() => {
                pathname = item.path || '/';

                this.setState({
                  pathname,
                });
              }}
            >
              <Link to={item.path ?? '/'}>{dom}</Link>
            </a>
          )}
          headerRender={() => (
            <div className={styles.header}>
              <Popover
                placement="bottomRight"
                content={() => (
                  <div style={{ width: '100%' }}>
                    <div className={styles.popover}>个人资料</div>
                    <div className={styles.popover}>退出登录</div>
                  </div>
                )}
                trigger="click"
              >
                <Avatar
                  shape="square"
                  size="large"
                  src=""
                  icon={<UserOutlined />}
                />
              </Popover>
            </div>
          )}
        >
          {this.props.children}
        </ProLayout>
      </div>
    );
  }
}
