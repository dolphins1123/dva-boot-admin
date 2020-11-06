import $$ from 'cmn-utils'

//收參數  變更 OFFSET
//用LOCAL  WEBAPI
export async function getData(payload) {
  console.log('payload', payload)

  const pageNum = 1
  const pageSize = 10
  if (payload !== undefined) {
    pageNum = payload.pageNum
    pageSize = payload.pageSize
  }
  
  const offset = pageNum * pageSize
  const _url = `https://localhost:44347/api/Customer/GetList?offset=${offset}&limit=${pageSize}`
  return $$.get(
    _url,
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
}
