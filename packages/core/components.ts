//引入Plugin，定义每个组件要符合Vue插件的结构规范
//从components包引入了组件，把它们作为插件形式使用
//作用：作为导出文件，导出components数组，按需引入的注册组件
import {ErButton} from '@toy-element/components';
import { ErButtonGroup } from '@toy-element/components';
import { ErIcon } from '@toy-element/components';
import { ErCollapse } from '@toy-element/components/Collapse';
import { ErCollapseItem } from '@toy-element/components/Collapse';
import { ErAlert } from '@toy-element/components';
import { ErTooltip } from '@toy-element/components/Tooltip'; 
import { ErPopconfirm } from '@toy-element/components/Popconfirm';
import { ErDropdown } from '@toy-element/components/Dropdown';
import { ErDropdownItem } from '@toy-element/components/Dropdown';
import type { Plugin } from 'vue'

export default [
    ErButton,
    ErButtonGroup,
    ErIcon,
    ErCollapse,
    ErCollapseItem,
    ErAlert,
    ErTooltip,
    ErPopconfirm,
    ErDropdown,
    ErDropdownItem,
] as Plugin[]
