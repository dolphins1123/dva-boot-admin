import React from 'react'
import { connect } from 'dva'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Layout, Button } from 'antd'
import BaseComponent from 'components/BaseComponent'
import Toolbar from 'components/Toolbar'
import SearchBar from 'components/SearchBar'
import DataTable from 'components/DataTable'
import { ModalForm } from 'components/Modal'
import createColumns from './columns'

import './index.less'
const { Content, Header, Footer } = Layout
const Pagination = DataTable.Pagination
// 練習CRUD
@connect(({ crud, loading }) => ({
  crud,
  loading: loading.models.crud,
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    rows: [],
  }

  handleDelete = (records) => {
    const { rows } = this.state

    this.props.dispatch({
      type: 'crud/remove',
      payload: {
        records,
        success: () => {
          // 如果操作成功，在已选择的行中，排除删除的行
          this.setState({
            rows: rows.filter(
              (item) => !records.some((jtem) => jtem.id === item.id)
            ),
          })
        },
      },
    })
  }

  render() {
    const { crud, loading, dispatch } = this.props
    const { pageData, employees } = crud
    const columns = createColumns(this, employees)
    const { rows, record, visible } = this.state

    const searchBarProps = {
      columns,
      onSearch: (values) => {
        // 查詢
        console.log('values=', values)

        dispatch({
          type: 'crud/getPageInfo',
          payload: {
            pageData: pageData.filter(values).jumpPage(1, 10),
            pageNum: 1,
          },
        })
      },
    }

    //DATATABLE   資料 dataSource
    const dataTableProps = {
      loading,
      columns,
      rowKey: 'CustomerID', //ken   rowkey
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map((item) => item.id),
      onChange: ({ pageNum, pageSize }) => {
        //分頁
        console.log('分頁page', pageNum, pageSize)
        dispatch({
          type: 'crud/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
            pageNum: pageNum,
          },
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }),
    }

    const modalFormProps = {
      loading,
      record,
      visible,
      columns,
      modalOpts: {
        width: 700,
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false,
        })
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        // 新增時 this.state.record   is null
        if (this.state.record === null) {
          dispatch({
            type: 'crud/create',

            payload: {
              notice: true,
              values,
              success: () => {
                this.setState({
                  record: null,
                  visible: false,
                })
              },
            },
            // afterResponse: (resp) => resp, // 可以让我们有机会处理反回的数据，非必需
            success: (resp) => {}, // 在dispatch结束后得到成功的回调，非必需
            error: (e) => {}, // 在dispatch结束后得到失败的回调，非必需
          })
        } else {
          dispatch({
            type: 'crud/save',
            payload: {
              values,
              success: () => {
                this.setState({
                  record: null,
                  visible: false,
                })
              },
            },
          })
        }
      },
    }
    //JSX
    return (
      <Layout className='full-layout crud-page'>
        <Header>
          <Toolbar
            appendLeft={
              <Button.Group>
                <Button
                  type='primary'
                  icon={<PlusOutlined />}
                  onClick={this.onAdd}
                >
                  新增
                </Button>
                <Button
                  disabled={!rows.length}
                  onClick={(e) => this.onDelete(rows)}
                  icon={<DeleteOutlined />}
                >
                  删除
                </Button>
              </Button.Group>
            }
            pullDown={<SearchBar type='grid' {...searchBarProps} />}
          >
            <SearchBar group='abc' {...searchBarProps} />
          </Toolbar>
        </Header>
        <Content>
          <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
        <ModalForm {...modalFormProps} />
      </Layout>
    )
  }
}
