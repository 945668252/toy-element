<script setup lang="ts">
import { provide, reactive,ref,watch, watchEffect } from 'vue';
import type {CollapseProps,CollapseContext,CollapseEmits,CollapseItemName} from './types'
import {COLLAPSE_CTX_KEY} from './constant';
import {debugWarn} from '@toy-element/utils'
import {each} from 'lodash-es'
/**
 * Collapse组件
 *  1.activeNames数组，修改和监视它的增减变化
 *  2.回调函数：双向绑定+自定义事件change
 *  3.手风琴模式accordion
 *  4.父子组件嵌套，用依赖注入provide/inject
 */
defineOptions({
    name:'ErCollapse',
})
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();

//Collapse组件的activeNames是一个数组！！！
const activeNames = ref<CollapseItemName[]>(props.modelValue ?? [])


function handleItemClick(item:CollapseItemName){
    let _activeNames = [...activeNames.value];
    console.log('props',props);
    //activeNames单数据
    if(props.accordion){
       _activeNames = [_activeNames[0] === item ? "" : item];
        // _activeNames = _activeNames[0] == item ? [] : [item];
        console.log('accordion',_activeNames);
        updateActiveNames(_activeNames);
        return;
    }

    //activeNames多数据
    const index = _activeNames.indexOf(item);
    if(index > - 1){
        _activeNames.splice(index,1)
    }else {
        _activeNames.push(item);
    }
    updateActiveNames(_activeNames)
}
watch(
    ()=>props.modelValue,
    (value)=>updateActiveNames(value as  CollapseItemName[])
)
watchEffect(()=>{
    //防错处理：手风琴模式+展开数据大于1
    if(props.accordion && activeNames.value.length > 1){
        debugWarn('ErCollapse','手风琴模式下，activeNames数据不能超过1个')
    }
})

//更新本地状态，外传
function updateActiveNames(val:CollapseItemName[]){
    activeNames.value = val;
    each(["update:modelValue", "change"], (e) =>
    emits(e as "update:modelValue" & "change", val)
  );
    // ['update:modelValue','change'].forEach((item:CollapseItemName)=>{
    //     emits(item as 'update:modelValue' & 'change',val)
    // })
}

provide(COLLAPSE_CTX_KEY,{
    activeNames,
    handleItemClick,
}
)
</script>
<template> 
    <div class="er-collapse">
        <slot></slot>
    </div>
</template>
<style scoped>
@import './style.css'; 
</style>