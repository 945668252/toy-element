import { createApp } from 'vue'
import App from './App.vue'
import ToyElement from 'toy-element';//因为core包的包名是toy-element，所以这样引入
// import 'toy-element/dist/index.css';//打包后，需要在这里引入样式
import 'toy-element/dist/index.css';//css分包后引入样式的改变

createApp(App).use(
    ToyElement
).mount('#app')
