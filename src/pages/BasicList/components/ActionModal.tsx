import { PREFIX, X_API_KEY } from '@/services/settings';
import { useRequest } from '@umijs/max';
import { Form, Input, Modal, Spin, Tag, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import ActionBuilder from '../builders/ActionBuilder';
import FormBuilder from '../builders/FormBuilder';
import styles from '../index.less';
import { setFieldsFormat, submitFieldsFormat } from '../utils';

const ActionModal = ({
  isModalOpen,
  hideModal,
  modalUrl,
}: {
  isModalOpen: boolean;
  hideModal: (reload?: boolean) => void;
  modalUrl: string;
}) => {
  const [form] = Form.useForm();

  const init = useRequest<{ data: BasicListApi.PageData }>(
    `${PREFIX}${modalUrl}${X_API_KEY}`,
    {
      manual: true,
      onError: () => {
        hideModal();
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
          create_time: dayjs(formValues.create_time).format(),
          update_time: dayjs(formValues.update_time).format(),
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
        hideModal(true);
      },
      formatResult: (res: any) => {
        return res;
      },
    },
  );
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    if (init.data) {
      form.setFieldsValue(setFieldsFormat(init.data));
    }
  }, [init.data]);

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
      init.run();
    }
  }, [isModalOpen]);

  const actionHandler = (action: BasicListApi.Action) => {
    switch (action.action) {
      case 'submit':
        form.setFieldsValue({ uri: action.uri, method: action.method });
        form.submit();
        break;
      case 'cancel':
        hideModal();
      case 'reset':
        form.resetFields();
      default:
        break;
    }
  };

  const onFinsh = (values: any) => {
    request.run(values);
  };

  return (
    <div>
      <Modal
        title={init?.data?.page?.title}
        open={isModalOpen}
        // () => void 格式一致时 可以直接传函数名
        onCancel={() => hideModal()}
        footer={ActionBuilder(
          init?.data?.layout?.actions[0]?.data,
          actionHandler,
          request.loading,
        )}
        maskClosable={false}
        forceRender
      >
        {init?.loading ? (
          // 优化用户体验
          <Spin tip="Loading..." />
        ) : (
          <>
            <Form
              {...layout}
              form={form}
              initialValues={{
                create_time: dayjs(),
                update_time: dayjs(),
                status: true,
              }}
              onFinish={onFinsh}
            >
              {FormBuilder(init?.data?.layout?.tabs[0]?.data)}
              <Form.Item name="uri" key="uri" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="method" key="method" hidden>
                <Input />
              </Form.Item>
            </Form>
            <Tag className={styles.formUpdateTime} color="geekblue">
              Update Time: &nbsp;
              {dayjs(form.getFieldValue('update_time')).format(
                'YYYY-MM-DD HH:mm:ss',
              )}
            </Tag>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ActionModal;
