<script setup lang="ts">
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {ref} from 'vue';

const collapseVal = ref(["a"]);
const items = ref([
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
]);
</script>

<template>
  <h2>er-button组件</h2>
  <er-button type="primary" size="small" :icon="faSearch">Button组件</er-button>
  <er-button icon="edit"></er-button>
    <er-button-group disabled size="large" type="danger">
    <er-button size="small">按钮组1</er-button>
    <er-button>按钮组2</er-button>
  </er-button-group>
  <h2>er-icon组件</h2>
  <er-icon icon="edit"></er-icon>
  <er-icon icon="check"/>
  <er-icon icon="message"/>
  <er-icon icon="trash"/>

  <h2>er-collapse组件</h2>
  <er-collapse v-model="collapseVal" accordion>
    <er-collapse-item name="a" title="折叠1">
      <div>我是折叠1组件</div>
    </er-collapse-item>
    <er-collapse-item name="b" title="折叠2">
      <div>我是折叠2组件</div>
    </er-collapse-item>
    <er-collapse-item name="c" title="折叠3">
      <div>我是折叠3组件</div>
    </er-collapse-item>
  </er-collapse>

  <h2>er-alert组件</h2>
  <er-alert title="title" type="success" show-icon />
  <er-alert title="title" description="description" type="warning" show-icon />
  <er-alert title="title" description="description" type="danger" show-icon />
  <er-alert title="title" description="description" type="info" show-icon />
  <h3>插槽</h3>
  <er-alert title="我是弹窗" type="warning" description="props内容">插槽内容</er-alert>
  <ErAlert title="支持大驼峰写法"/>

  <h2>er-tooltip组件</h2>
    <!-- export declare type VariationPlacement = "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"; -->
  <span>右键触发</span>
  <er-tooltip
    ref="tooltipRef"
    placement="right-end"
    trigger="contextmenu"
    :popper-options="{ placement: 'right-end', strategy: 'fixed' }"
  >
    <er-button icon="arrow-up">tooltip</er-button>
    <template #content> 弹出部分 </template>
  </er-tooltip>
  <br/>
  <span>hover触发</span>
  <er-tooltip
    ref="tooltipRef"
    placement="bottom-end"
  >
    <er-button icon="arrow-up">tooltip</er-button>
    <template #content> 弹出部分 </template>
  </er-tooltip>
  <br/>
  <span>点击触发</span>
  <er-tooltip
    ref="tooltipRef"
    placement="left-end"
    trigger="click"
  >
    <er-button icon="arrow-up">tooltip</er-button>
    <template #content> 弹出部分 </template>
  </er-tooltip>
  <div style="margin-left: 100px;">
    <er-tooltip
    ref="tooltipRef"
    placement="left-end"
    trigger="click"
  >
    <er-button icon="arrow-up">tooltip</er-button>
    <template #content> 弹出部分 </template>
  </er-tooltip>
  </div>

  <h2>er-popconfirm组件</h2>
  <er-popconfirm title="Are you sure to delete this?">
      <er-button type="danger">Danger</er-button>
  </er-popconfirm>

  <h2>er-dropdown组件</h2>
   <span >通过 slot 传入 item</span>
      <er-dropdown>
        <span class="dropdown-link">
          下拉菜单1
          <er-icon icon="angle-down" />
        </span>
        <template #dropdown>
          <er-dropdown-item command="1">Action 1</er-dropdown-item>
          <er-dropdown-item command="2" label="Action 2" />
          <er-dropdown-item command="3" disabled>Action 3</er-dropdown-item>
          <er-dropdown-item command="4" divided>Action 4</er-dropdown-item>
        </template>
      </er-dropdown>
  <br/>
  <span >通过 props 传入 item</span>
  <er-dropdown :items="items">
    <span class="dropdown-link">
        下拉菜单2
      <er-icon icon="angle-down" />
    </span>
  </er-dropdown>

  <div>触发对象的变更</div>
  <er-dropdown :items="items">
      <er-button type="primary">
        Dropdown List
        <er-icon icon="angle-down" style="margin-left: 8px" />
      </er-button>
    </er-dropdown>
    <er-dropdown
      :items="items"
      type="primary"
      @click="()=>console.log('click')"
      split-button
    >
      Dropdown List
    </er-dropdown>
</template>

