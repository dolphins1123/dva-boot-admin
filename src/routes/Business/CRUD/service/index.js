import $$ from 'cmn-utils'

//收參數  變更 OFFSET
//用LOCAL  WEBAPI
export async function getData(payload) {
  console.log('getData  payload====', payload)

  var offset =
    payload.pageData.pageNum * payload.pageData.pageSize -
    payload.pageData.pageSize

  console.log('offset====', offset)
  const _url = `https://localhost:44347/api/Customer/GetList?offset=${offset}&limit=${
    payload.pageData.pageSize
  }&filters=${JSON.stringify(payload.pageData.filters)}`
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
