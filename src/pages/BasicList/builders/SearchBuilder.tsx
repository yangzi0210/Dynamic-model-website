import { Col, DatePicker, Form, Input, Select, TreeSelect } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: 'Today', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];
const SearchBuilder = (data: BasicListApi.TableColumn[] | undefined) => {
  return (data || []).map((field) => {
    const basicAttr = {
      label: field.title,
      name: field.key,
      key: field.key,
    };
    switch (field.type) {
      case 'text':
        return (
          <Col sm={6}>
            <Form.Item {...basicAttr}>
              <Input disabled={field.disabled} />
            </Form.Item>
          </Col>
        );
      case 'datetime':
        return (
          <Col sm={12} pull={2}>
            <Form.Item {...basicAttr}>
              <DatePicker.RangePicker
                showTime
                disabled={field.disabled}
                style={{ width: '126%' }}
                presets={rangePresets}
              />
            </Form.Item>
          </Col>
        );
      case 'tree':
        return (
          <Col sm={6}>
            <Form.Item {...basicAttr}>
              <TreeSelect
                treeData={field.data}
                disabled={field.disabled}
                treeCheckable
              />
            </Form.Item>
          </Col>
        );
      case 'select':
      case 'switch':
        return (
          <Col sm={6}>
            <Form.Item {...basicAttr} valuePropName="checked">
              <Select>
                {(field.data || []).map((option: any) => {
                  return (
                    <Select.Option value={option.value} key={option.title}>
                      {option.title}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        );

      default:
        return null;
    }
  });
};

export default SearchBuilder;
