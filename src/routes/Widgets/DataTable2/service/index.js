import $$ from 'cmn-utils'

//收參數  變更 OFFSET
export async function getData(payload) {
  console.log('getData pageNum=', payload.pageNum)
  const pageSize = 10
  const offset = payload.pageNum * pageSize
  return $$.get(
    //'https://run.mocky.io/v3/070a63cc-fc16-4796-ae59-3021b506ea5b',
    'https://portal2.emic.gov.tw/DIM2_Develop/api/DIM2990301/getCaserepByCountyTown?county=%E8%87%BA%E5%8C%97%E5%B8%82&limit=100&offset=' +
      offset,
    {},
    {
      //responseType: null,  // 不处理返回结果
      afterResponse: null, // 不走公共 afterResponse
    }
  )
    .then(function (resp) {
      console.log(resp)
      return resp
    })
    .catch((e) => console.log(e))

  ///user/menu

  //https://my.api.mockaroo.com/table_demo.json?key=416e4a40
}
