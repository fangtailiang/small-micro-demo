import './public-path'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


// window.mount = () => {
//   ReactDOM.render(<App />, document.getElementById("root"))
// }

// // 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
// window.unmount = () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById('root'))
// }

// // 如果不在微前端环境，则直接执行mount渲染
// if (!window.__MICRO_APP_ENVIRONMENT__) {
//   window.mount()
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

