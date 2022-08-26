import { defineConfig } from 'umi';
import routes from './src/routers/index';
export default defineConfig({
  title: '管理平台业务模版',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
});
