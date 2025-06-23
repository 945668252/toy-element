<script setup lang="ts">
/**每个组件的常用目录结构
 * Button.vue
 * Button.test.tsx  测试用例
 * types.ts  所有ts的类型声明
 * style.css
 * constant.ts  常量
 */
import { ref,computed, inject } from 'vue';
import type {ButtonProps,ButtonEmits,ButtonInstance} from './types.ts';
import {throttle} from 'lodash-es';
import ErIcon from '../Icon/Icon.vue'
import { BUTTON_GROUP_CTX_KEY } from './constants.ts';

defineOptions({
    name:'ErButton'
})
//withDefaults:设置默认值。defineProps：定义组件接收的props
const props = withDefaults(defineProps<ButtonProps>(),{
    tag:'button',
    nativeType:'button',
    type:'primary',
    size:'default',
    useThrottle: true,
    throttleDuration: 500,
    loading:false,
})
//写上下文
const buttonGroupCtx = inject(BUTTON_GROUP_CTX_KEY,void 0);
const size = computed(()=>buttonGroupCtx?.size ?? props.size ?? '');
const type = computed(()=>buttonGroupCtx?.type ?? props.type ?? '');
const disabled = computed(()=> props.disabled || buttonGroupCtx?.disabled || false);

const slots = defineSlots();
const _ref = ref<HTMLButtonElement>();
const emits = defineEmits<ButtonEmits>();

defineExpose<ButtonInstance>({
    ref:_ref,
    disabled,
    size,
    type,
})

const handleBtnClick = (e:MouseEvent) =>{
    emits('click', e);
}
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration)


const iconStyle = computed(()=>({
    marginRight:slots.default?"6px":"0px",
}))
</script>

<template>
    <component
        :is = 'tag'
        ref="_ref"
        class="er-button"
        :type="tag ==='button'?nativeType:void 0"
        :autofocus = autofocus
        :disabled = "disabled || loading?true : void 0"
        :class = "{
            [`er-button--${type}`]:type,
            [`er-button--${size}`]:size,
            'is-plain':plain,
            'is-round':round,
            'is-circle':circle,
            'is-disabled':disabled,
            'is-loading':loading,
        }"
        @clcik="
        (e:MouseEvent)=>useThrottle?handleBtnClickThrottle(e):handleBtnClick(e)
        "
    >

    <template v-if="loading">
        <slot name="loading">
            <er-icon
                class="loading-icon"
                :icon="loadingIcon ?? 'spinner'"
                :style="iconStyle"
                size="1x"
                spin

            ></er-icon>
        </slot>
    </template>
    <er-icon
        size="1x"
        :icon="icon"
        :style="iconStyle"
        v-if="icon && !loading"
    />
    <slot></slot>
    </component>
</template>
<style scoped>
@import './style.css';
</style>