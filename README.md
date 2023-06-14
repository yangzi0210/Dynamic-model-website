# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce)

## 问题

- ✅ 碰到问题多用谷歌、多看官方文档 百度 CSDN 都是一个抄一个 而且不一定好使
  - 比如 如何判断一个对象是不是 moment/dayjs 百度搜索都是什么说 可以使用\_isAMomentObject 这个属性进行判断 谷歌一搜官方文档说了 直接用 moment.isMoment() dayjs.isDayjs() 就行 好用还清晰
- ⬜ module vs namespace? type vs interface?
- ⬜ app.ts 的接口报错的返回处理
- ⬜ 异常处理再思考一下 ：全局异常处理，一部分是全局的错误拦截，另一部分是单独组件的错误拦截。
- ✅ 批量删除时弹窗里的表格可以正常在显示，单个删除时表格无法显示
  - 应该是 useState 执行时机的问题，使用 useRef/useSessionStorageState(ahooks) 来解决
- ✅ 控制台报错：Warning: Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?
  - 看官方文档解决 https://ant.design/components/form-cn#%E4%B8%BA%E4%BD%95%E5%9C%A8-modal-%E4%B8%AD%E8%B0%83%E7%94%A8-form-%E6%8E%A7%E5%88%B6%E5%8F%B0%E4%BC%9A%E6%8A%A5%E9%94%99
- ✅ 因为后端没做字段控制适配，前端增加请求时的字段为空值时不传该字段，查看 umi 等相关文档 GET 请求参数序列化 https://umijs.org/docs/max/request#get-%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0%E5%BA%8F%E5%88%97%E5%8C%96
  - 使用`query-string`库的方法`skipEmptyString: true, skipNull: true`实现
- ✅ 使用 Ant-motion 做动画时 包裹组件动画不生效 查文档得知 `解决方法`：**每个子标签必须带 key，如果未设置 key 将不执行动画。**
- ✅ 使用 antd 栅格布局 结合组件 styles 实现样式更优雅
- ✅ 添加搜索组件 其中展开按钮用 ahooks 的 useToggle
