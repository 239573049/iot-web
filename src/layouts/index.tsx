import { ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';
import defaultProps from './menu';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'umi';

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
        headerRender={false}
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
              setPathname(item.path || '/');
            }}
          >
            <Link to={pathname ?? '/'}>{dom}</Link>
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
      >
        {props.children}
      </ProLayout>
    </div>
  );
};
