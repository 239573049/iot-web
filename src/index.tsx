import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { RightContent } from '@ant-design/pro-layout/lib/components/TopNavHeader';
import Footer from '@ant-design/pro-layout/lib/Footer';

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent matchMenuKeys={[]} />,
    footerRender: () => <Footer />,
    onPageChange: () => {
      console.log('测试');
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
