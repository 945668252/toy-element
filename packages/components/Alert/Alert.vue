<script setup lang="ts">
import type {AlertEmits,AlertProps,AlertInstance} from './types';
import {ref,computed} from 'vue';
import {typeIconMap} from '@toy-element/utils'

defineOptions({
    name:'ErAlert'
})

const props = withDefaults(defineProps<AlertProps>(),{
    type:'info',
    effect:'light',
    closable:true,
})
const emits = defineEmits<AlertEmits>();
const slots = defineSlots();

const visible = ref(true);
const withDescription = computed(()=> slots.default || props.description);
const iconName = computed(()=>typeIconMap.get(props.type) ?? 'circle-info')

function open(){
    visible.value = true;
}
function close(){
    visible.value = false;
    emits('close');
}
defineExpose<AlertInstance>({
    open,
    close,
})

</script>
<template>
    <transition name="er-alert-fade">
        <div
            v-show="visible"
            class="er-alert"
            :class="{
                [`er-alert__${type}`]:type,
                [`er-alert__${effect}`]:effect,
                'text-center':center
            }"
        >
            <er-icon
                v-if="showIcon"
                class="er-alert__icon"
                :class="{'big-icon':withDescription}"
                :icon="iconName"
            />
            <div class="er-alert__content">
               <span
                    class="er-alert__title"
                    :class="{'with-desc':withDescription}"
                    :style="{display:center && !showIcon ? 'flow':'inline'}" 
               >
                    <slot name="title">{{title}}</slot>
               </span>
               <p class="er-alert__description">
                    <slot>{{description}}</slot>
               </p>
               <div class="er-alert__close" v-if="closable">
                    <er-icon @click.stop="close" icon="xmark"/>
               </div> 
            </div>
        </div>
    </transition>
</template>
<style scoped>
@import './style.css'; 
</style>