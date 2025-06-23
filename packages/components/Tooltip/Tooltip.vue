<script setup lang="ts">
import { computed, onUnmounted, ref,watchEffect,watch,type Ref } from 'vue';
import type {TooltipProps,TooltipInstance,TooltipEmits} from './types';
import type { ButtonInstance } from 'toy-element';
import {bind,debounce,drop,type DebouncedFunc} from 'lodash-es'
import {createPopper, type Instance} from '@popperjs/core';
import useEvenstToTiggerNode from "./useEventsToTiggerNode";
import { useClickOutside } from "@toy-element/hooks";

defineOptions({
    name:'ErTooltip',
})
interface _TooltipProps extends TooltipProps {
    virtualTriggering?:boolean;
    virtualRef?:HTMLElement | ButtonInstance | void;
}

const props  = withDefaults(defineProps<_TooltipProps>(),{
    placement:'bottom',
    trigger:'hover',
    transition:'fade',
    showTimeout:0,
    hideTimeout:200,
})

const emits = defineEmits<TooltipEmits>();
const visible = ref(false);

//事件对象
const outerEvents:Ref<Record<string,EventListener>> = ref({});
const events:Ref<Record<string,EventListener>> = ref({});
const dropdownEvents:Ref<Record<string,EventListener>> = ref({});

//组件实例
const containerNode = ref<HTMLElement>();
const _triggerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();

//popper实例
let popperInstance:null | Instance;
//延迟
let openDebounce:DebouncedFunc<()=>void> | void;
let closeDebounce:DebouncedFunc<()=>void> | void;


//触发方式对应的方法
const triggerStrategyMap:Map<string,()=>void> = new Map();
triggerStrategyMap.set('hover',()=>{
    events.value['mouseenter'] = openFinal;
    dropdownEvents.value['mouseenter'] = openFinal;
    outerEvents.value['mouseleave'] = closeFinal;
})

triggerStrategyMap.set('click',()=>{
    events.value['click'] = togglePopper;
})

triggerStrategyMap.set('contextmenu',()=>{
    events.value['contextmenu'] = (e)=>{
        e.preventDefault();
        openFinal();
    }
})
function togglePopper(){
    visible.value?closeFinal():openFinal();
}
//为了方便，重置后重新绑定事件监听
function resetEvents(){
    outerEvents.value = {};
    events.value = {};  
    dropdownEvents.value = {};

    attachEvents();
}
//触发事件对应的方法
function attachEvents(){
    if(props.disabled || props.manual){
        return;
    }
    triggerStrategyMap.get(props.trigger)?.();
}
//非手动，触发事件
if(!props.manual){
    attachEvents();
}

//显示和隐藏的方法，添加防抖效果
function openFinal(){
    closeDebounce?.cancel();
    openDebounce?.();
}
function closeFinal(){
    openDebounce?.cancel();
    closeDebounce?.();
}
function setVisible(value:boolean){
    if(props.disabled){
        return;
    }
    visible.value = value;
    emits('visible-change',value)
}

const openDelay = computed(()=>{
    return props.trigger === 'hover'?props.showTimeout:0;
})
const closeDelay = computed(()=>{
    return props.trigger === 'hover'?props.hideTimeout:0;
})
//考虑虚拟节点作为触发元素的情况
const triggerNode = computed(()=>{
    if(props.virtualTriggering){
        return ((props.virtualRef as ButtonInstance)?.ref as any)??
        (props.virtualRef as HTMLElement) ??
        _triggerNode.value as HTMLElement
    }
    return _triggerNode.value as HTMLElement;
})
const popperOptions = computed(()=>({
    placement:props.placement,
    modifiers:[
        {name:'offset',options:{offset:[0,10]}}
    ],
    ...props.popperOptions,
}))
watchEffect(()=>{
    openDebounce = debounce(bind(setVisible,null,true),(openDelay.value as number|undefined));
    closeDebounce = debounce(bind(setVisible,null,false),(closeDelay.value as number|undefined))
})
//添加4个监听事件：浮层的显隐+是否手动+是否禁用+触发方式的变化
//浮层打开：创建Popper实例(必须触发元素和浮层元素都存在的情况)
watch(
    visible,
    (val)=>{
        if(!val) return;

        if(triggerNode.value && popperNode.value){
            popperInstance = createPopper(
                triggerNode.value,
                (popperNode.value as HTMLElement),
                popperOptions.value,
        )
        }
    },
    {flush:'post'}
)
//触发方式：变化了，重新绑定事件的监听对象
watch(
    ()=>props.trigger,
    (newVal,oldVal) =>{
        if(newVal == oldVal) return;
        resetEvents();
    }
)
//trigger是非手动触发，则触发事件方法,否则清空事件监听器
watch(
    ()=>props.manual,
    (isManual)=>{
        if(isManual){
            events.value = {};
            dropdownEvents.value = {};
            outerEvents.value = {};
            return;
        }
        attachEvents();
    }
)
//启用和关闭disabled，把浮层关闭:关掉正在open的函数，立即关闭visible，visible事件变化了传回父组件，重新绑定事件对象的监听
watch(
    ()=>props.disabled,
    (newVal,oldVal)=>{
        if(newVal == oldVal){
            return;
        }
        openDebounce?.cancel();
        visible.value = false;
        emits('visible-change',false);
        resetEvents();
    }
)
/**
 * 触发元素是虚拟节点，如何拥有mouseenter,click,contextmenu的监听？
 * 为虚拟触发节点动态绑定/解绑事件监听器，支持Tooltip在使用虚拟触发元素时依然响应交互(mouseenter,click,contextmenu)
 */
useEvenstToTiggerNode(props, triggerNode, events, () => {
  openDebounce?.cancel();
  setVisible(false);
});
//检测点击是否发生在dom元素之外：点击弹窗外部关闭弹窗/点击下拉菜单外部关闭菜单/Tooltip 或 Popover 的点击外部关闭逻辑
useClickOutside(containerNode, () => {
  emits("click-outside");
  if (props.trigger === "hover" || props.manual) return;
  visible.value && closeFinal();
});
const show:TooltipInstance['show'] = openFinal;
const hide:TooltipInstance['hide'] = function(){
    openDebounce?.cancel();
    setVisible(false);
}
defineExpose<TooltipInstance>({
    show,
    hide,
})
function destoryPopperInstance(){
    popperInstance?.destroy();
    popperInstance = null;
}
onUnmounted(()=>{
    destoryPopperInstance();
})
</script>
<template>
    <div class="er-tooltip" ref="containerNode" v-on="outerEvents">
        <div
            v-if="!virtualTriggering"
            class="er-tooltip__trigger"
            ref="_triggerNode"
            v-on="events"
        >
            <slot></slot>
        </div>
        <slot name="default" v-else></slot>
        
        <trasition :name="transition" @after-leave="destoryPopperInstance">
            <div
                class="er-tooltip__popper"
                ref="popperNode"
                v-on="dropdownEvents"
                v-if="visible"
            >
                <slot name="content">
                    {{content}}
                </slot>
                <div id="arrow" data-popper-arrow></div>
            </div>
        </trasition>
    </div>
</template>
<style scoped>
@import './style.css'; 
</style>