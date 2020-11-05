import React from 'react'
import { connect, router } from 'dva'
import { Layout, Row, Col, Button } from 'antd'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import SideLayout from 'components/SideLayout'
import DataTable, { Editable } from 'components/DataTable'
import { columns1 } from './columns'
import './index.less'
import Toolbar from 'components/Toolbar'
import SearchBar from 'components/SearchBar'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import createColumns from './ColumnSearch'
const { Link } = router
const { Content } = Layout
const Pagination = DataTable.Pagination
//const TreeNode = Tree.TreeNode

@connect(({ datatable, loading }) => ({
  datatable,
  loading: loading.models.datatable,
}))
export default class extends BaseComponent {
  state = {
    editingKey: null,
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: true,
    Val: 0,
  }

  componentDidMount() {
    const { dispatch, datatable } = this.props
    const { pageData, pageDataSort } = datatable

    dispatch({
      type: 'datatable/getKenData',
      payload: {
        valueField: 'pageDataSort',
        url: '/datatable/getKenData',
        pageInfo: pageDataSort.startPage(1, 10),
        pageNum: 1,
        // pageSize: pageData.pageSize,
      },
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    console.log('======props=======')
    console.log(this.props)

    this.props.dispatch({
      type: 'datatable/getKenData',
      payload: {
        valueField: 'pageDataSort',
        url: '/datatable/getKenData',
        pageNum: pagination.pageNum,
        pageSize: 10,
        pageInfo: this.props.datatable.pageDataSort.startPage(
          pagination.pageNum,
          10
        ),
        // pageInfo: this.props.datatable.pageDataSort(pagination.pageNum, 10),
        // pageInfo: state.pageDataSort.sortBy(sorter).jumpPage(2, 10), //pageNum, pageSize
      },
    })
    // this.getData(
    //   pagination.current * pagination.pageSize - pagination.pageSize,
    //   pagination.pageSize,
    //   {
    //     order: sorter.hasOwnProperty('column') ? sorter : false,
    //   }
    // )
  }

  render() {
    const columns = createColumns(this)

    const searchBarProps = {
      columns,
      onSearch: (values) => {
        console.log(values)
      },
    }

    const { datatable, loading } = this.props
    const { pageData, dataList, pageDataSort } = datatable
    const dataTableProps1 = {
      loading,
      columns: columns1,
      rowKey: 'caseNo',
      // dataItems: pageData,
      // onChange: ({ pageNum, pageSize, sorter }) => {

      // },
      // 上面  內部分頁 . 1次LOAD 全部
      // 以下 外部分頁
      dataItems: pageDataSort,
      // onChange: ({ pageNum, pageSize, sorter }) => {
      //   this.props.dispatch({
      //     type: 'datatable2/getKenData',
      //     payload: {
      //       valueField: 'pageDataSort',
      //       url: '/datatable/getKenData',
      //       pageInfo: pageDataSort.sortBy(sorter).jumpPage(pageNum, pageSize),
      //     },
      //   })
      // },
      isScroll: true,
    }

    return (
      <Layout className='full-layout page datatable-page'>
        <Content>
          <Panel title='查詢條件'>
            <Toolbar
              className='toolbar-demo'
              appendLeft={
                <Button.Group>
                  <Button type='primary'>
                    <PlusOutlined />
                    新增
                  </Button>
                  <Button>
                    <DeleteOutlined />
                    删除
                  </Button>
                </Button.Group>
              }
              pullDown={<SearchBar type='grid' {...searchBarProps} />}
            >
              <SearchBar {...searchBarProps} group='1' />
            </Toolbar>
          </Panel>

          <Panel title='AXIOS 災情資料 分页'>
            <DataTable
              {...dataTableProps1}
              pagination
              onChange={this.handleTableChange}
            />
          </Panel>
        </Content>
      </Layout>
    )
  }
}
