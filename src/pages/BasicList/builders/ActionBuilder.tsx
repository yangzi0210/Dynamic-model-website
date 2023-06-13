import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';

const ActionBuilder = (
  // 第一个参数加 ? 为可选参数后 后续的参数都必须为可选参数 所以使用 ... | undefined 联合类型
  actions: BasicListApi.Action[] | undefined,
  actionHandler: BasicListApi.ActionHandler,
  loading?: boolean,
  record = [],
) => {
  return (actions || []).map((action) => {
    if (action.component === 'button') {
      return (
        <Button
          type={action.type as ButtonType}
          key={action.text}
          onClick={() => actionHandler(action, record)}
          loading={loading}
        >
          {action.text}
        </Button>
      );
    }
    return null;
  });
};
export default ActionBuilder;
