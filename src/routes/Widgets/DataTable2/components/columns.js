import React, { Fragment } from 'react'
import DataTable, { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import { Button } from 'antd'
const Tip = DataTable.Tip

export const columns1 = [
  {
    title: '案件編號',
    name: 'caseNo',
    sorter: true,
    tableItem: { sorter: true, fixed: 'left' },
  },
  {
    title: '縣市',
    name: 'county',
    tableItem: { fixed: 'left' },
  },
  {
    title: '發生地點',
    name: 'address',
    tableItem: { sorter: true, fixed: 'left' },
  },
  {
    title: '處理狀態',
    name: 'caseStatus',
    tableItem: { fixed: 'left' },
  },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip='修改'>
            <Icon type='edit' />
          </Button>
          <Button tooltip='删除'>
            <Icon type='trash' />
          </Button>
        </DataTable.Oper>
      ),
    },
  },
]
