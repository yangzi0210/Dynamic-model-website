import dayjs from 'dayjs';

export const setFieldsFormat = (data: BasicListApi.PageData) => {
  const result = {};
  if (data?.layout.tabs && data.dataSource) {
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

export const submitFieldsFormat = (formValues: any) => {
  const result = formValues;
  Object.keys(formValues).forEach((key) => {
    if (dayjs.isDayjs(formValues[key])) {
      result[key] = dayjs(formValues[key]).format();
    }
    if (Array.isArray(formValues[key])) {
      result[key] = formValues[key].map((innerValue: any) =>
        dayjs.isDayjs(innerValue) ? dayjs(innerValue).format() : innerValue,
      );
    }
  });
  return result;
};
