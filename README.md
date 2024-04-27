# ww-space 作品集展示项目 - 前台

这个项目模仿了dribbble网页设计的视觉效果（ps仅作为练习使用），使用 React + Node.js 搭建的个人作品展示项目。项目分为前台、后台、服务端三个代码仓，整体都使用 TypeScript 开发，并配置了 Eslint + Prettier 进行代码风格规范优化。

🟢 本仓库为前台部分。

#### 查看前台与服务端:   [⚛ 管理后台](https://github.com/tomoko-tiba/ww-space-portfolio-react/tree/master)  [⚙ 服务端](https://github.com/tomoko-tiba/ww-space-backend-express/tree/main)

## 管理后台介绍

#### https://yenny.wang/

- 通过 Vite 从零搭建的 React 项目
- 使用 React Router 的 history 模式配置了列表、详情、搜索、404 等页面。
- 封装了公共头部等布局组件。
- 使用 axios 进行后端接口调用，列表支持用户下拉无限滚动分页加载。
- 使用 CSS 媒体查询实现移动端响应式效果。
- 使用 Zustand 进行全局状态管理，维护列表页和详情页中共用的用户点赞状态。

## 使用

```
# install dependency
npm install

# develop
npm run dev
```
