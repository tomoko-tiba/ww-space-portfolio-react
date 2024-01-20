import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css' // 清楚浏览器默认样式差异
import './reset.css' // 样式重制
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
