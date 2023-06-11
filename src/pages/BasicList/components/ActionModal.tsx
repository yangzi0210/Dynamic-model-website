import { PREFIX } from '@/services/settings';
import { useRequest } from '@umijs/max';
import { Form, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import ActionBuilder from '../builders/ActionBuilder';
import FormBuild from '../builders/FormBuilder';

const setFieldsFormat = (data: PageApi.Data) => {
  const result = {};
  if (data?.layout.tabs && data?.dataSource) {
    data.layout.tabs.forEach((tab) => {
      tab.data.forEach((field) => {
        const key = field.key;
        switch (field.type) {
          case 'datetime':
            //@ts-ignore
            result[key] = dayjs(data.dataSource[key]);
            break;
          default:
            //@ts-ignore
            result[key] = data.dataSource[key];
            break;
        }
      });
    });
  }
  return result;
};

const ActionModal = ({
  isModalOpen,
  hideModal,
  modalUrl,
}: {
  isModalOpen: boolean;
  hideModal: () => void;
  modalUrl: string;
}) => {
  const [form] = Form.useForm();
  const init = useRequest<{ data: PageApi.Data }>(`${modalUrl}`, {
    manual: true,
  });
  const request = useRequest(
    (values: any) => {
      const { uri, method, ...formValues } = values;
      return {
        url: `${PREFIX}${uri}`,
        method,
        data: {
          ...formValues,
          'X-API-KEY': 'antd',
          create_time: dayjs(formValues.create_time).format(),
          update_time: dayjs(formValues.update_time).format(),
        },
      };
    },
    {
      manual: true,
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
        onCancel={hideModal}
        footer={ActionBuilder(
          init?.data?.layout?.actions[0]?.data,
          actionHandler,
        )}
        maskClosable={false}
      >
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
          {FormBuild(init?.data?.layout?.tabs[0]?.data)}
          <Form.Item name="uri" key="uri" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="method" key="method" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ActionModal;
