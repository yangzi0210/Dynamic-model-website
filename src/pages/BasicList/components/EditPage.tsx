import { PREFIX, X_API_KEY } from '@/services/settings';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { TabsProps } from 'antd';
import { Card, Form, Input, Space, Spin, Tabs, Tag, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { history, useLocation, useRequest } from 'umi';
import ActionBuilder from '../builders/ActionBuilder';
import FormBuilder from '../builders/FormBuilder';
import styles from '../index.less';
import { setFieldsFormat, submitFieldsFormat } from '../utils';
const EditPage = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const init = useRequest<{ data: BasicListApi.PageData }>(
    `${PREFIX}${location.pathname.replace('/basicList', '')}${X_API_KEY}`,
    {
      onError: () => {
        history.back();
      },
    },
  );
  const request = useRequest(
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
          ...submitFieldsFormat(formValues),
          'X-API-KEY': 'antd',
        },
      };
    },
    {
      manual: true,
      onSuccess: (data) => {
        message.success({
          content: data.message,
          key: 'process',
        });
        history.back();
      },
      formatResult: (res: any) => {
        return res;
      },
    },
  );

  const tabItems: TabsProps['items'] = init?.data?.layout.tabs.map((tab) => {
    return {
      key: tab.title,
      label: tab.title,
      children: <Card>{FormBuilder(tab.data)}</Card>,
    };
  });

  useEffect(() => {
    if (init.data) {
      form.setFieldsValue(setFieldsFormat(init.data));
    }
  }, [init.data]);

  const actionHandler = (action: BasicListApi.Action) => {
    switch (action.action) {
      case 'submit':
        form.setFieldsValue({ uri: action.uri, method: action.method });
        form.submit();
        break;
      case 'cancel':
        history.back();
        break;
      case 'reset':
        form.resetFields();
        break;
      default:
        break;
    }
  };

  const onFinish = (values: any) => {
    request.run(values);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return (
    <PageContainer>
      {init?.loading ? (
        <Spin tip="Loading..." />
      ) : (
        <Form
          form={form}
          {...layout}
          initialValues={{
            create_time: dayjs(),
            update_time: dayjs(),
            status: true,
          }}
          onFinish={onFinish}
        >
          <Tabs items={tabItems} className={styles.pageTabs}></Tabs>
          <Card style={{ textAlign: 'center', marginTop: '20px' }}>
            {(init?.data?.layout?.actions || []).map((action) => (
              <Card key={action.name}>
                <Space>{ActionBuilder(action.data, actionHandler)}</Space>
              </Card>
            ))}
          </Card>
          <FooterToolbar
            extra={
              <Tag color="geekblue">
                Update Time:&nbsp;
                {dayjs(form.getFieldValue('update_time')).format(
                  'YYYY-MM-DD HH:mm:ss',
                )}
              </Tag>
            }
          >
            {ActionBuilder(init?.data?.layout?.actions[0].data, actionHandler)}
          </FooterToolbar>
          <Form.Item name="uri" key="uri" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="method" key="method" hidden>
            <Input />
          </Form.Item>
        </Form>
      )}
    </PageContainer>
  );
};

export default EditPage;
