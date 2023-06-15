import { PREFIX, X_API_KEY } from '@/services/settings';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { history, useLocation, useRequest } from '@umijs/max';
import { useToggle } from 'ahooks';
import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Modal,
  Pagination,
  Row,
  Space,
  Table,
  Tooltip,
  message,
} from 'antd';
import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import ActionBuilder from './builders/ActionBuilder';
import ColumnBuilder from './builders/ColumnBuilder';
import SearchBuilder from './builders/SearchBuilder';
import ActionModal from './components/ActionModal';
import styles from './index.less';
import { submitFieldsFormat } from './utils';
const { confirm } = Modal;

const Index = () => {
  const [pageQuery, setPageQuery] = useState<string>('');
  const [sortQuery, setSortQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<BasicListApi.TableColumn[]>(
    [],
  );
  const [tableColumns, setTableColumns] = useState<BasicListApi.TableColumn[]>(
    [],
  );
  const [searchVisiable, searchActions] = useToggle<boolean>(false);
  const batchTableColumns = useRef<BasicListApi.TableColumn[]>([]);
  const location = useLocation();
  const init = useRequest<{ data: BasicListApi.ListData }>((values: any) => {
    return {
      url: `${PREFIX}${location.pathname.replace(
        '/basic-list',
        '',
      )}${X_API_KEY}${pageQuery}${sortQuery}`,
      params: values,
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'comma',
          skipEmptyString: true,
          skipNull: true,
        }),
    };
  });
  const request = useRequest<{ data: BasicListApi.ListData }>(
    (values: any) => {
      message.loading({
        content: 'Processing...',
        key: 'process',
        duration: 0,
      });
      const { uri, method, ...formValues } = values;
      return {
        url: `${PREFIX}${uri}`,
        method,
        data: {
          ...formValues,
          'X-API-KEY': 'antd',
        },
      };
    },
    {
      manual: true,
      onSuccess: (data: any) => {
        message.success({
          content: data?.message,
          key: 'process',
        });
      },
      formatResult: (res: any) => {
        return res;
      },
    },
  );
  useEffect(() => {
    init.run();
  }, [pageQuery, sortQuery, location.pathname]);

  useEffect(() => {
    if (init?.data?.layout?.tableColumn) {
      const tableColumns = ColumnBuilder(
        init.data.layout.tableColumn,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        actionHandler,
      );
      batchTableColumns.current = tableColumns;
      setTableColumns(tableColumns);
    }
  }, [init?.data?.layout?.tableColumn]);
  const batchOverview = (dataSource: BasicListApi.TableColumn[]) => {
    return (
      <Table
        size="small"
        rowKey="id"
        columns={[
          batchTableColumns.current[0] || {},
          batchTableColumns.current[1] || {},
        ]}
        dataSource={dataSource}
      />
    );
  };
  function actionHandler(
    action: BasicListApi.Action,
    record: BasicListApi.TableColumn,
  ) {
    switch (action.action) {
      case 'modal': {
        const url: string | undefined = action.uri?.replace(
          /:\w+/g,
          (field) => record[field.replace(':', '')],
        );
        setModalUrl(url as string);
        setIsModalOpen(true);
        break;
      }
      case 'page': {
        const url = action.uri?.replace(
          /:\w+/g,
          (field) => record[field.replace(':', '')],
        );
        history.push(`/basic-list${url}`);
        break;
      }
      case 'reload':
        init.run();
        break;
      case 'delete':
      case 'deletePermanently':
      case 'restore':
        confirm({
          title: `Are you sure ${action.action} this task?`,
          icon: <ExclamationCircleOutlined />,
          content: batchOverview(
            Object.keys(record).length ? [record] : selectedRows,
          ),
          okText: `Sure To ${action.action}!`,
          cancelText: 'Cancel',
          onOk() {
            // 加上 return 就可以实现按钮 loading 原理看文档 Promise
            return request.run({
              uri: action.uri,
              method: action.method,
              type: action.action,
              // 批量和单行的编辑操作
              ids: Object.keys(record).length ? [record.id] : selectedRowKeys,
            });
          },
          onCancel() {},
        });
        break;
      default:
        break;
    }
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (value: any) => {
    init.run(submitFieldsFormat(value));
  };
  const searchLayout = () => {
    return (
      searchVisiable && (
        <Card key="searchForm">
          <Form {...layout} onFinish={onFinish}>
            <Row gutter={24}>
              <Col sm={6}>
                <Form.Item label="ID" name="id" key="id">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              {SearchBuilder(init.data?.layout.tableColumn)}
            </Row>
            <Row>
              <Col sm={24} className={styles.textAlignRight}>
                <Space key="space">
                  <Button type="primary" htmlType="submit" key="submitButton">
                    Submit
                  </Button>
                  <Button
                    htmlType="reset"
                    onClick={() => {
                      init.run();
                    }}
                    key="clearButton"
                  >
                    Clear
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Card>
      )
    );
  };
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>
            <Tooltip title="search">
              <Button
                type={searchVisiable ? 'primary' : 'default'}
                shape="circle"
                icon={<SearchOutlined />}
                onClick={() => searchActions.toggle()}
              />
            </Tooltip>
            {ActionBuilder(init?.data?.layout?.tableToolBar, actionHandler)}
          </Space>
        </Col>
      </Row>
    );
  };
  const paginationChangeHandler = (page: any, per_page: any) => {
    setPageQuery(`&page=${page}&per_page=${per_page}`);
  };
  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Pagination
            total={init?.data?.meta?.total || 0}
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 10}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            onChange={paginationChangeHandler}
            onShowSizeChange={paginationChangeHandler}
          />
        </Col>
      </Row>
    );
  };
  const tableChangeHandler = (_: any, __: any, sorter: any) => {
    if (!sorter.order) {
      setSortQuery('');
    } else {
      const orderBy = sorter.order === 'ascend' ? 'asc' : 'desc';
      setSortQuery(`&sort=${sorter.field}&order=${orderBy}`);
    }
  };
  const hideModal = (reload = false) => {
    setIsModalOpen(false);
    if (reload) {
      init.run();
    }
  };
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };
  const batchToolBar = () =>
    selectedRowKeys.length
      ? ActionBuilder(init?.data?.layout?.batchToolBar, actionHandler)
      : null;
  // !!selectedRowKeys.length &&
  // ActionBuilder(init?.data?.layout?.batchToolBar, actionHandler);
  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="id"
          dataSource={init?.data?.dataSource}
          columns={tableColumns}
          pagination={false}
          loading={init.loading}
          onChange={tableChangeHandler}
          rowSelection={rowSelection}
        />
        {afterTableLayout()}
      </Card>
      <ActionModal
        isModalOpen={isModalOpen}
        hideModal={hideModal}
        modalUrl={modalUrl}
      />
      <FooterToolbar>{batchToolBar()}</FooterToolbar>
    </PageContainer>
  );
};
export default Index;
