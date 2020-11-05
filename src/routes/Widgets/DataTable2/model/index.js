import modelEnhance from '@/utils/modelEnhance'
import PageHelper from '@/utils/pageHelper'
import { getData } from '../service/index'
export default modelEnhance({
  namespace: 'datatable',

  state: {
    pageData: PageHelper.create(),
    pageDataSort: PageHelper.create(),
    dataList: {
      list: [],
    },
  },

  //async
  effects: {
    *getKenData({ payload }, { call, put }) {
      const resp = yield call(getData, payload)

      yield put({
        type: 'getDataSuccess',
        payload: { resp, pageNum: payload.pageNum },
      })
      // }
    },
  },

  //await
  reducers: {
    getDataSuccess(state, { payload }) {
      console.log('getDataSuccess  payload=', payload)
      state.pageDataSort.list = payload.resp.result.caseList
      state.pageDataSort.total = payload.resp.result.rowCount
      state.pageDataSort.totalPages = 10

      console.log('2========state.pageData', state.pageData)

      return {
        ...state,
        data: payload,
      }
    },
    save2(state, action) {
      alert('save2')
      return { ...state, ...action.payload }
    },
  },
})
