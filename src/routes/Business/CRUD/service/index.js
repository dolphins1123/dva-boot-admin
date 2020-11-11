import $$ from 'cmn-utils'

//收參數  變更 OFFSET
//用LOCAL  WEBAPI
export async function getData(payload) {
  var offset =
    payload.pageData.pageNum * payload.pageData.pageSize -
    payload.pageData.pageSize

  const _url = `http://127.0.0.1/crud/api/Customer/GetList?offset=${offset}&limit=${
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
      return resp
    })
    .catch((e) => console.log(e))
}

//更新
export async function Update(payload) {
  const model = payload //JSON.stringify(payload)

  const _url = 'http://127.0.0.1/crud/api/Customer/UPDATE'
  return $$.post(
    _url,
    model,

    {
      //responseType: null,  // 不处理返回结果
      afterResponse: null, // 不走公共 afterResponse
    }
  )
    .then((resp) => {
      console.log('resp.success=', resp.success)
      return resp.success
    })
    .catch((e) => console.log(e))
}

//新增
export async function Create(payload) {
  const model = payload //JSON.stringify(payload)

  const _url = 'http://127.0.0.1/crud/api/Customer/Create'
  return $$.post(
    _url,
    model,

    {
      //responseType: null,  // 不处理返回结果
      afterResponse: null, // 不走公共 afterResponse
    }
  )
    .then((resp) => {
      console.log('resp.success=', resp.success)
      return resp.success
    })
    .catch((e) => console.log(e))
}

export async function Delete(payload) {
  //const model = payload //JSON.stringify(payload)
  const delList = payload
    .map(function (value) {
      return value.CustomerID.trim()
    })
    .join(',')

  const delpar = { idList: delList }
  console.log('del payload =', delpar)
  const _url = `http://127.0.0.1/crud/api/Customer/Delete?idList=${delList}`

  return $$.get(
    _url,
    {},
    {
      //responseType: null,  // 不处理返回结果
      afterResponse: null, // 不走公共 afterResponse
    }
  )
    .then(function (resp) {
      console.log('resp.success=', resp.success)
      return resp
    })
    .catch((e) => console.log(e))
}
