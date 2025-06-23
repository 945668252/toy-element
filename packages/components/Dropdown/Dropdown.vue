<script setup lang="ts">
import type {DropdownProps,DropdownEmits,DropdownContext,DropdownInstance,DropdownItemProps} from './types';
import {DROPDOWN_CTX_KEY} from './constants';
import { provide,ref,computed } from 'vue';
import type {TooltipInstance} from '../Tooltip';
import type {ButtonInstance} from '../Button';
import { useId } from "@toy-element/hooks";
import Tooltip from '../Tooltip/Tooltip.vue';
import DropdownItem from './DropdownItem.vue';
import { isNil, omit } from 'lodash-es';

defineOptions({
    name:'ErDropdown'
})

const props = withDefaults(defineProps<DropdownProps>(),{
    hideOnClick:true,
    items:()=>[] as DropdownItemProps[],
})
const tooltipProps = computed(()=>
    omit(props,['type','size','items','hideOnClick','splitButton','items'])
)
const emits = defineEmits<DropdownEmits>();
//创建实例
const tooltipRef = ref<TooltipInstance>();
const triggerRef = ref<ButtonInstance>();//虚拟触发

// !TEST && useDisabledStyle();
//点击菜单项的处理：是否关闭+传递command值
function handleItemClick(e:DropdownItemProps){
    props.hideOnClick && tooltipRef.value?.hide();
    !isNil(e.command) && emits('command',e.command);
}
provide<DropdownContext>(DROPDOWN_CTX_KEY,{
    handleItemClick,
    size:computed(()=>props.size)
})
defineExpose<DropdownInstance>({
    open:()=>tooltipRef.value?.show(),
    close:()=>tooltipRef.value?.hide(),
})
</script>
<template>
<div
    :id="`dropdown-${useId().value}`"
    class="er-dropdown"
    :class="{
        'is-disabled':props.disabled
    }"
>
    <tooltip
        ref="tooltipRef"
        :virtual-triggering="splitButton"
        :virtual-ref="triggerRef"
        v-bind="tooltipProps"
        @visible-change="$emit('visible-change',$event)"
    >
    <er-button-group
        v-if="splitButton"
        :type="type"
        :size="size"
        :disabled="disabled"
    >
        <er-button @click="$emit('click',$event)">
            <slot name="default"></slot>
        </er-button>
        <er-button ref="triggerRef" icon="angle-down"></er-button>
    </er-button-group>
    <slot v-else name="default"></slot>

    <template #content>
        <ul class="er-dropdown__menu">
            <slot name="dropdown">
                <template
                    v-for="item in items"
                    :key="item.command ?? useId().value"
                >
                    <dropdown-item v-bind="item"></dropdown-item>
                </template>
            </slot>
        </ul>
    </template>
    </tooltip>
</div>
</template>

<style scoped>
@import './style.css';

:deep(.er-button-group) {
  & > :last-child {
    padding: 5px 7px;
  }
}
</style>