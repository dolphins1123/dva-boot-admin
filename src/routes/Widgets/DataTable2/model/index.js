import modelEnhance from '@/utils/modelEnhance'
import PageHelper from '@/utils/pageHelper'
import { getData } from '../service/index'
export default modelEnhance({
  namespace: 'datatable',

  state: {
    pageData: PageHelper.create(), //  pageData =  pageinfo
    pageDataSort: PageHelper.create(),
    //deptTreeData: [],
    dataList: {
      list: [],
    },
  },

  //async
  effects: {
    *getKenData({ payload }, { call, put }) {
      console.log('async payload=========', payload)
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
      //state.pageData.total / state.pageData.pageSize

      // state.pageDataSort = state.pageData
      console.log('2========state.pageData', state.pageData)
      // state.pageData = PageHelper.responseFormat(payload)
      // console.log('=========getDataSuccess==========2')
      // state.pageDataSort = PageHelper.responseFormat(payload)
      // console.log('=========getDataSuccess==========3')

      // console.log('state.pageData', state.pageData)
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