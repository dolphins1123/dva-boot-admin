import modelEnhance from '@/utils/modelEnhance'
import PageHelper from '@/utils/pageHelper'
import { getData, Update, Create, Delete } from '../service/index'

/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false
export default modelEnhance({
  namespace: 'crud',

  state: {
    pageData: PageHelper.create(),
    pageDataSort: PageHelper.create(),
    dataList: {
      list: [],
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/crud' && !LOADED) {
          LOADED = true
          dispatch({
            type: 'init',
          })
        }
      })
    },
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      const { pageData } = yield select((state) => state.crud)
      yield put({
        type: 'getPageInfo',
        payload: {
          pageData: pageData.startPage(1, 10),
        },
      })
      yield put({
        type: 'getEmployees',
      })
    },
    // 获取分页数据
    *getPageInfo({ payload }, { call, put }) {
      const { pageData } = payload

      const resp = yield call(getData, payload)
      yield put({
        type: 'getDataSuccess',
        payload: { resp, pageNum: payload.pageNum },
      })
    },
    // 保存 之后查询分页
    *save({ payload }, { call, put, select, take }) {
      const { values, success } = payload
      const { pageData } = yield select((state) => state.crud)
      // put是非阻塞的 put.resolve是阻塞型的

      //KEN修改  UPDATE  .改進SERVICE 的API

      const isUpdOK = yield call(Update, payload.values)
      console.log('isUpdOK=', isUpdOK)

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })
      success()
    },
    //新增資料資料
    *create({ payload }, { call, put, select, take }) {
      const { values, success } = payload
      const { pageData } = yield select((state) => state.crud)
      // put是非阻塞的 put.resolve是阻塞型的

      const isAddOK = yield call(Create, payload.values)
      console.log('isAddOK=', isAddOK)

      yield put({
        type: 'getPageInfo',

        payload: { pageData },
      })
      success()
    },
    // 修改
    *update({ payload }, { call, put }) {},
    // 删除 之后查询分页
    *remove({ payload }, { call, put, select }) {
      const { records, success } = payload
      const { pageData } = yield select((state) => state.crud)

      console.log('success   =', success) //多筆

      const isSuccess = yield call(Delete, records)

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })
      success()
    },
    // 获取员工列表
    // *getEmployees({ payload }, { call, put }) {
    //   yield put({
    //     type: '@request',
    //     afterResponse: (resp) => resp.data,
    //     payload: {
    //       valueField: 'employees',
    //       url: '/crud/getWorkEmployee',
    //     },
    //   })
    // },
  },

  reducers: {
    //put date
    getDataSuccess(state, { payload }) {
      console.log('getDataSuccess  payload=', payload)
      state.pageData.list = payload.resp.result
      state.pageData.total = payload.resp.totalRowCount
      state.pageData.totalPages = payload.resp.totalPage

      return {
        ...state,
        data: payload,
      }
    },
  },
})
