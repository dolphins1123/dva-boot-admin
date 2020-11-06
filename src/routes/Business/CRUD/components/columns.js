import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import { router } from 'dva'
const { Link } = router

export default (self, employees) => [
  {
    title: '客戶ID',
    name: 'CustomerID',
    tableItem: {},
    searchItem: {
      group: 'abc',
    },
    formItem: {},
  },
  {
    title: '公司名稱',
    name: 'CompanyName',
    tableItem: {},
    formItem: {},
    searchItem: {},
  },
  {
    title: '城市',
    name: 'City',
    // dict: [
    //   { code: '0', codeName: '城市' },
    //   { code: '1', codeName: '乡村' },
    // ],
    tableItem: {},
    formItem: {
      type: 'select',
    },
    searchItem: {
      type: 'select',
    },
  },
  {
    title: '電話',
    name: 'Phone',
    tableItem: {},
    formItem: {},
    searchItem: {},
  },
  {
    title: '傳真',
    name: 'Fax',
    tableItem: {},
    formItem: {
      // type: 'datetime',
    },
    searchItem: {
      //type: 'datetime',
    },
  },
  // {
  //   title: '竣工时间',
  //   name: 'planEndTime',
  //   tableItem: {},
  //   formItem: {
  //     type: 'datetime',
  //   },
  //   searchItem: {
  //     type: 'datetime',
  //   },
  // },
  {
    title: '地址',
    name: 'Address',
    tableItem: {
      // render: (text) => text.map((item) => item.title).join(','),
    },
    formItem: {
      // type: 'transfer',
      // modal: true,
      // dataSource: employees,
      // normalize: (value) => value.map((item) => item.key),
    },
  },
  // {
  //   title: '作业内容',
  //   name: 'content',
  //   formItem: {
  //     type: 'editor',
  //   },
  // },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip='修改' onClick={(e) => self.onUpdate(record)}>
            <Icon type='edit' />
          </Button>
          <Button tooltip='删除' onClick={(e) => self.onDelete(record)}>
            <Icon type='trash' />
          </Button>
          {/* <Button tooltip='跳转到新路由'>
            <Link to={'/crud/detail?id=' + record.id}>
              <Icon type='LinkOutlined' antd />
            </Link>
          </Button> */}
        </DataTable.Oper>
      ),
    },
  },
]
