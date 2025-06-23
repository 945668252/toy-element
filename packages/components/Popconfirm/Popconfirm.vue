<script setup lang="ts">
import type {PopconfirmProps,PopconfirmEmits} from './types';
import type{TooltipInstance} from '../Tooltip';
import {computed, ref} from 'vue';
import {addUnit} from '@toy-element/utils';

defineOptions({
    name:'ErPopconfirm'
})
const props = withDefaults(defineProps<PopconfirmProps>(),{
    title:'',
    cancelButtonType:'danger',
    confirmButtonType:'primary',
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    icon:'question-circle',
    iconColor:'#f90',
    hideAfter:200,
    width:150,
})

const emits = defineEmits<PopconfirmEmits>();
const tooltipRef = ref<TooltipInstance>();
const style = computed(()=>({width:addUnit(props.width)}));

function hidePopper(){
    tooltipRef.value?.hide();
}
function cancel(e:MouseEvent){
    emits("cancel",e);
    hidePopper();
}
function confirm(e:MouseEvent){
    emits("confirm",e);
    hidePopper();
}
</script>
<template>
    <er-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
        <template v-if="$slots.default" #default>
            <slot name="default"></slot>
        </template>
        <template v-if="$slots.reference" #default>
            <slot name="reference"></slot>
        </template>
        <template #content>
            <div class="er-popconfirm" :style="style">
                <div class="er-popconfirm_main">
                    <er-icon v-if="icon && !hideIcon" :icon="icon" :color="iconColor"/>
                    {{title}}
                </div>
                <div class="er-popconfirm_action">
                    <er-button size="small" class="er-popconfirm_cancel" :type="cancelButtonType" @click="cancel">
                        {{cancelButtonText}}
                    </er-button>

                    <er-button size="small" class="er-popconfirm_confirm" :type="confirmButtonType" @click="confirm">
                        {{confirmButtonText}}
                    </er-button>
                </div>
            </div>
        </template>
    </er-tooltip>
</template>
<style  scoped>
@import './style.css';
</style>