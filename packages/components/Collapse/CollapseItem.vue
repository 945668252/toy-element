<script setup lang="ts">
import { computed, inject } from 'vue';
import {COLLAPSE_CTX_KEY} from './constant';
import type {CollapseItemProps,CollapseContext,CollapseItemName} from './types';
import transitionEvents from "./transitionEvents";


defineOptions({
    name:'ErCollapseItem',
});

const props =  defineProps<CollapseItemProps>()
const ctx = inject(COLLAPSE_CTX_KEY,void 0);
const isActive = computed(()=>ctx?.activeNames.value?.includes((props.name as CollapseItemName)))
function handleClick(){
    console.log(props,'11')
    if(props.disabled){
        return;
    }
    ctx?.handleItemClick(props.name as CollapseItemName)
}
</script>

<template>
<div
    class="er-collapse-item"
    :class="{
        'is-disabled':disabled    
    }"
>
    <div
        class="er-collapse-item__header"
        :class="{
            'is-disabled':disabled,
            'is-active':isActive,
        }"
        @click="handleClick"
    >
        <span class="er-collapse-item_title">
            <slot name="title">
                {{title}}
            </slot>
        </span>
        <er-icon icon="angle-right" class="header-angle"></er-icon>
    </div>

    <transition name="slide" v-on="transitionEvents">
        <div class="er-collapse-item__content" v-show="isActive">
            <div class="er-collapse-item__content-inner" :id="`item-content-${name}`">
                <slot></slot>
            </div>
        </div>
    </transition>
</div>
</template>
<style scoped>
@import './style.css'; 
</style>