import { DatePicker, Form, Input, Switch, TreeSelect } from 'antd';

const FormBuilder = (data: BasicListApi.TableColumn[] | undefined) => {
  return (data || []).map((field: any) => {
    switch (field.type) {
      case 'text':
        return (
          <Form.Item label={field.title} name={field.key} key={field.key}>
            <Input disabled={field.disabled} />
          </Form.Item>
        );
      case 'datetime':
        return field.key === 'update_time' ? (
          <></>
        ) : (
          <Form.Item label={field.title} name={field.key} key={field.key}>
            <DatePicker showTime disabled={field.disabled} />
          </Form.Item>
        );

      case 'tree':
        return (
          <Form.Item label={field.title} name={field.key} key={field.key}>
            <TreeSelect
              treeData={field.data}
              disabled={field.disabled}
              treeCheckable
            />
          </Form.Item>
        );

      case 'switch':
        return (
          <Form.Item
            label={field.title}
            name={field.key}
            key={field.key}
            valuePropName="checked" // 告诉 form 赋值给 checked
          >
            <Switch disabled={field.disabled} />
          </Form.Item>
        );
      default:
        return null;
    }
  });
};

export default FormBuilder;
