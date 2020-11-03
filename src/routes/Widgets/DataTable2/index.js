import { dynamicWrapper, createRoute } from '@/utils/core'

//ken 練習DATATABLE 用法
const routesConfig = (app) => ({
  path: '/datatable2',
  title: '数据表格2',
  component: dynamicWrapper(app, [import('./model')], () =>
    import('./components')
  ),
})

export default (app) => createRoute(app, routesConfig)
