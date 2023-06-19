# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce)

## 总结

- ✅ 碰到问题多用谷歌、多看官方文档 百度 CSDN 都是一个抄一个 而且不一定好使
  - 比如 如何判断一个对象是不是 moment/dayjs 百度搜索都是什么说 可以使用\_isAMomentObject 这个属性进行判断 谷歌一搜官方文档说了 直接用 moment.isMoment() dayjs.isDayjs() 就行 好用还清晰
- ✅ module vs namespace? type vs interface?
- ⬜ app.ts 的接口报错的返回处理 & 异常处理再思考一下 ：全局异常处理，一部分是全局的错误拦截，另一部分是单独组件的错误拦截。
- ✅ 批量删除时弹窗里的表格可以正常在显示，单个删除时表格无法显示
  - 应该是 useState 执行时机的问题，使用 useRef/useSessionStorageState(ahooks) 来解决
- ✅ 控制台报错：Warning: Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?
  - 看官方文档解决 [文档](https://ant.design/components/form-cn#%E4%B8%BA%E4%BD%95%E5%9C%A8-modal-%E4%B8%AD%E8%B0%83%E7%94%A8-form-%E6%8E%A7%E5%88%B6%E5%8F%B0%E4%BC%9A%E6%8A%A5%E9%94%99)
- ✅ 因为后端没做字段控制适配，前端增加请求时的字段为空值时不传该字段，查看 umi 等相关文档 GET 请求参数序列化 [文档](https://umijs.org/docs/max/request#get-%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0%E5%BA%8F%E5%88%97%E5%8C%96)
  - 使用`query-string`库的方法`skipEmptyString: true, skipNull: true`实现
- ✅ 使用 Ant-motion 做动画时 包裹组件动画不生效
  - 查文档得知 `解决方法`：**每个子标签必须带 key，如果未设置 key 将不执行动画。**
- ✅ 使用 antd 栅格布局 结合组件 styles 实现样式更优雅
- ✅ 添加搜索组件 其中展开按钮用 ahooks 的 useToggle
- ✅ 利用 Button 的 htmlType 属性 `submit`、`reset`
- ⬜ replace()方法
- ⬜ 整理一下 ahooks 一些好用的 hooks
- ✅ 从服务端请求菜单 问题：路由与页面匹配问题 & 服务端获取的菜单重定向不生效且 icon 不会自动转化 [issues](https://github.com/ant-design/ant-design-pro/issues/8101)
  - app.ts layout 增加 iconfontUrl 用阿里的 iconfont
  - 通配符 \* :id :name 匹配
- ✅ 关于提问 antd issue & Google & github & stackoverflow & 官方文档 & 最小重现 codesandbox
- ✅ 打开浏览器控制台 Network 发现首次进入页面有两个相同的 http 请求
  - 使用 ahooks useWhyDidYouUpdate 找到依赖状态的变化 其实就是 useEffect 首次执行一次 依赖的状态刚进入页面时会从无到有再执行一次
  - 使用 ahooks useUpdateEffect 让 useEffect 首次不执行，只在依赖项更新时运行
- ⬜ 动态模型的原理 字段的增加等
  - Get layout ? Get layout form 'listBuilder' (code from Model) : Get layout form 'Database' (code from Trait)
  - 前端传的布局 JSON 给后端，后端一式两份，一份格式化处理拆分字段，一份原封不动存储，前端需要时再传回去
- ✅ 垃圾箱进入退出后 & 切换页面后 批量选择项（batchToolbar）持续存在 注意 setSelectedRowKeys setSelectedRows 置空解决
- ✅ console 报错的问题 <Col> 组件也要加 key
- ⬜ 有时间完善下登录页相关 & 国际化
- ✅ 安装 formily 报错
  - 版本问题 目前使用的 antd5，应安装 yarn add --save antd dayjs yarn add --save @formily/core @formily/react @formily/antd-v5 推测是 antd5 用 dayjs 而 antd4 用 momentjs 的问题
- ⬜ JSON Schema
- ⬜ formily 表单加一个字段 组件为 Button 由于模块“"@formily/antd-v5"”没有导出的成员“Button” 采用 Antd 导出 Button 发现列出现了但是不显示 Button
  - 原因：F12 点击空白区域发现有 Button，但是没值 `<Button></Button` 使用 `x-component-props = {{children:'Data',}}` 解决
- ⬜ onClick 放置位置
  - 首先觉得使用 `x-component-props = {{children:'Data',onClick:()=>{}}}` 但是这样只能打开弹窗 不知道是谁打开、控制的 那个字段 数据怎么交互
  - 字段监听 antd 文档 focusTriggerAfterClose
- modal 未清空
- ✅ formily Chrome 浏览器插件比较好用 看各组件层级的状态比较清晰
- ⬜ 提交表单后 菜单（路由）刷新 + loading
  - useModel refresh
- ⬜ 面包屑优化
