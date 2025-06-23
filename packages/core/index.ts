//该文件作用：提供了统一的导出接口，支持按需引入和全局注册两种方式
import {makeInstaller} from '@toy-element/utils'
import components from './components'
import '@toy-element/theme/index.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import pringLogo from './pringLogo';


library.add(fas);
const installer = makeInstaller(components);

pringLogo();

export * from '../components'
// export * from '@toy-element/components'
//创建插件实例，这个插件可以在Vue应用中通过app.use(installer)全局注册组件
export default installer


//"main": "./dist/umd/index.umd.js",
//"module": "./dist/es/index.js",