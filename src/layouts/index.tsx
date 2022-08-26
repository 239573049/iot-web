import { ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';
import defaultProps from './menu';
import { Avatar, Popover, Button } from 'antd';
import { UserOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import styles from './index.less';
export default (props) => {
  const [pathname, setPathname] = useState('/');

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        route={defaultProps}
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
              console.log(item);

              setPathname(item.path || '/');
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
        {props.children}
      </ProLayout>
    </div>
  );
};
