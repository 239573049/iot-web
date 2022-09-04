import {
  AlipayCircleOutlined,
  LockOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Space, message } from 'antd';
import { CSSProperties, useState } from 'react';
import AuthApi from '@/apis/auth/index';
import { setToken } from '../../utils/token';
import { history } from 'umi';

const iconStyles: CSSProperties = {
  marginLeft: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

var user = JSON.parse(window.localStorage.getItem('user'));

export default () => {
  if (user?.autoLogin) {
    console.log('自动登录');
    onSubmit(user);
  }

  function onSubmit(value: any) {
    AuthApi.auth(value).then((res: any) => {
      if (res.code === '200') {
        setToken(res.data);

        if (value.autoLogin) {
          window.localStorage.setItem('user', JSON.stringify(value));
        } else {
          window.localStorage.removeItem('user');
        }
        message.info('登录成功，请稍后！');

        setTimeout(() => {
          history.push('/');
        }, 2000);

        return;
      }
      message.error(res.message);
    });
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Iot管理系统"
        subTitle="更好的Iot管理系统"
        onFinish={async (value: any) => {
          onSubmit(value);
        }}
        actions={
          <Space>
            其他登录方式
            <AlipayCircleOutlined style={iconStyles} />
            <TaobaoCircleOutlined style={iconStyles} />
            <WeiboCircleOutlined style={iconStyles} />
          </Space>
        }
      >
        <ProFormText
          name="accountNumber"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'用户名: admin'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'密码: dd666666'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginForm>
    </div>
  );
};
